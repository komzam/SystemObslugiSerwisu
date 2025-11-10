using System.Net;
using System.Text;
using System.Text.Json;
using Amazon.S3;
using Amazon.S3.Model;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using system_obslugi_serwisu.Application.Storage;
using system_obslugi_serwisu.Infrastructure.Queue;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.ImageProcessing;

public class ImageProcessingWorker(QueueConnectionProvider connectionProvider, IAmazonS3 s3Client) : BackgroundService
{
    private readonly Dictionary<string, int> _sizeMap = new()
    {
        ["sm"] = 320,
        ["md"] = 640,
        ["lg"] = 1280,
        ["xl"] = 1920
    };
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var connection = await connectionProvider.GetConnectionAsync(stoppingToken);
        var channel = await connection.CreateChannelAsync(cancellationToken: stoppingToken);
        
        await channel.QueueDeclareAsync(queue: "image-processing", durable: true, exclusive: false, autoDelete: false, 
            arguments: null, cancellationToken: stoppingToken);
        
        var consumer = new AsyncEventingBasicConsumer(channel);
        consumer.ReceivedAsync += async (model, ea) =>
        {
            var body = ea.Body.ToArray();

            var parsedMessage = JsonSerializer.Deserialize<MinioMessage>(body);
            if (parsedMessage == null)
                return;

            foreach (var record in parsedMessage.Records)
            {
                if (record.S3.Object.Metadata.ContainsKey("X-Amz-Meta-Resized"))
                    continue;
                
                await ResizeImage(record, stoppingToken);
            }
            
            await channel.BasicAckAsync(ea.DeliveryTag, false, stoppingToken);
        };

        await channel.BasicConsumeAsync(queue: "image-processing", autoAck: false, consumer: consumer, cancellationToken: stoppingToken);

        await Task.Delay(Timeout.Infinite, stoppingToken);
    }

    public async Task<OperationResult> ResizeImage(MinioRecord record, CancellationToken cancellationToken = default)
    {
        var bucketName = record.S3.Bucket.Name;
        var objectKey = WebUtility.UrlDecode(record.S3.Object.Key);
        
        try
        {
            var getImageRequest = new GetObjectRequest
            {
                BucketName=bucketName,
                Key = objectKey
            };
            
            using var response = await s3Client.GetObjectAsync(getImageRequest,  cancellationToken);
            using var imageStream = new MemoryStream();
            await response.ResponseStream.CopyToAsync(imageStream, cancellationToken);
            
            
            foreach (var targetWidth in _sizeMap)
            {
                using var resizedImage = await ResizeImageAsync(imageStream, targetWidth.Value, cancellationToken);
                var createImageRequest = new PutObjectRequest
                {
                    BucketName = bucketName,
                    Key = $"{objectKey}-{targetWidth.Key}",
                    InputStream = resizedImage,
                    ContentType = "image/jpeg"
                };

                createImageRequest.Metadata.Add("resized", "true");
                
                await s3Client.PutObjectAsync(createImageRequest, cancellationToken);
            }

            return OperationResult.Success();
        }catch(Exception e)
        {
            Console.WriteLine(e);
            return StorageErrors.UnknownError();
        }
    }
    
    public async Task<Stream> ResizeImageAsync(Stream inputStream, int width, CancellationToken cancellationToken = default)
    {
        inputStream.Position = 0;

        using var image = await Image.LoadAsync(inputStream, cancellationToken);
        if (width >= image.Width)
        {
            var unchangedOutputStream = new MemoryStream();
            inputStream.Position = 0;
            await inputStream.CopyToAsync(unchangedOutputStream, cancellationToken);
            unchangedOutputStream.Position = 0;
            return unchangedOutputStream;
        }

        var ratio = image.Width / (double)image.Height;
        var height = (int)(width / ratio);
        
        image.Mutate(x => x.Resize(new ResizeOptions
        {
            Mode = ResizeMode.Max,
            Size = new Size(width, height)
        }));
        
        var outputStream = new MemoryStream();
        await image.SaveAsJpegAsync(outputStream, new JpegEncoder{Quality = 70},cancellationToken);

        outputStream.Position = 0;
        return outputStream;
    }
}