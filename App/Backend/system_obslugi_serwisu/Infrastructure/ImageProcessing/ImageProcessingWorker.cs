using System.Net;
using System.Text;
using System.Text.Json;
using Amazon.S3;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using system_obslugi_serwisu.Infrastructure.Queue;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.ImageProcessing;

public class ImageProcessingWorker(QueueConnectionProvider connectionProvider, IAmazonS3 s3Client) : BackgroundService
{
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

            await ResizeImage(parsedMessage);
            await channel.BasicAckAsync(ea.DeliveryTag, false, stoppingToken);
        };

        await channel.BasicConsumeAsync(queue: "image-processing", autoAck: false, consumer: consumer, cancellationToken: stoppingToken);

        await Task.Delay(Timeout.Infinite, stoppingToken);
    }

    public async Task<OperationResult> ResizeImage(MinioMessage message)
    {
        Console.WriteLine(message.Records.First().S3.Bucket.Name);
        Console.WriteLine(WebUtility.UrlDecode(message.Records.First().S3.Object.Key));
        return OperationResult.Success();
        /*try
        {
            var getImageRequest = new GetPreSignedUrlRequest
            {
                BucketName=buckets.Value.RepairShopImages,
                Key = $"images/{id.Value}",
                Verb = HttpVerb.GET,
                Expires = DateTime.Now.AddMinutes(20),
                Protocol = Protocol.HTTP
            };
            
            return await s3Client.GetPreSignedURLAsync(getImageRequest);
        }catch
        {
            return StorageErrors.UnknownError();
        }*/
    }
}