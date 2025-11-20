using System.Net;
using System.Text;
using System.Text.Json;
using Amazon.S3;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Infrastructure.ImageProcessing;
using system_obslugi_serwisu.Infrastructure.Queue;
using system_obslugi_serwisu.Infrastructure.S3;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Images;

public class DbImageAddingWorker(
    QueueConnectionProvider connectionProvider,
    IAmazonS3 s3Client,
    IServiceScopeFactory scopeFactory,
    IOptions<S3Buckets> buckets) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var connection = await connectionProvider.GetConnectionAsync(stoppingToken);
        var channel = await connection.CreateChannelAsync(cancellationToken: stoppingToken);
    
        await channel.QueueDeclareAsync(queue: "image-upload", durable: true, exclusive: false, autoDelete: false, 
            arguments: null, cancellationToken: stoppingToken);
    
        var consumer = new AsyncEventingBasicConsumer(channel);
        consumer.ReceivedAsync += async (model, ea) =>
        {
            var body = ea.Body.ToArray();

            var parsedMessage = JsonSerializer.Deserialize<MinioMessage>(body);
            if (parsedMessage == null)
                return;

            bool failed = false;
            
            foreach (var record in parsedMessage.Records)
            {
                if (record.S3.Object.Metadata.ContainsKey("X-Amz-Meta-Resized"))
                    continue;

                OperationResult result;
                
                if (record.S3.Bucket.Name == buckets.Value.RepairImages)
                {
                    result = await AddRepairImage(record);
                }
                else if (record.S3.Bucket.Name == buckets.Value.RepairShopImages)
                {
                    result = await AddRepairShopImage(record);
                }
                else
                {
                    continue;
                }

                failed = failed && result.IsFailure;
            }
            
            if(failed)
                await channel.BasicNackAsync(ea.DeliveryTag, false, false, stoppingToken);
            else
                await channel.BasicAckAsync(ea.DeliveryTag, false, stoppingToken);
        };

        await channel.BasicConsumeAsync(queue: "image-upload", autoAck: false, consumer: consumer, cancellationToken: stoppingToken);

        await Task.Delay(Timeout.Infinite, stoppingToken);
    }

    private async Task<OperationResult> AddRepairImage(MinioRecord record)
    {
        using (var scope = scopeFactory.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            
            var objectKey = WebUtility.UrlDecode(record.S3.Object.Key);
            var parts = objectKey.Split('/');
            if (parts.Length < 2)
            {
                return OperationResult.Failure(new OperationError("General"));
            }

            var repairIdString = parts[0];
            var imageIdString = parts[1];
            
            if(!Guid.TryParse(repairIdString, out var repairId))
            {
                return OperationResult.Failure(new OperationError("General"));
            }
            
            if(!Guid.TryParse(imageIdString, out var imageId))
            {
                return OperationResult.Failure(new OperationError("General"));
            }

            await using var transaction = await dbContext.Database.BeginTransactionAsync();
            try
            {
                dbContext.Images.Add(new Image
                {
                    Id=new ImageId(imageId)
                });
                await dbContext.SaveChangesAsync();

                dbContext.RepairImages.Add(new RepairImage
                {
                    ImageId = new ImageId(imageId),
                    RepairId = new RepairId(repairId)
                });
                await dbContext.SaveChangesAsync();
                
                await transaction.CommitAsync();
                return OperationResult.Success();
            }
            catch
            {
                return DatabaseErrors.UnknownError();
            }
        }
    }

    private async Task<OperationResult> AddRepairShopImage(MinioRecord record)
    {
        using (var scope = scopeFactory.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            
            var objectKey = WebUtility.UrlDecode(record.S3.Object.Key);
            var parts = objectKey.Split('/');
            if (parts.Length < 3)
            {
                return OperationResult.Failure(new OperationError("General"));
            }

            var repairShopIdString = parts[0];
            var imageTypeString = parts[1];
            var imageIdString = parts[2];
            
            if(!Guid.TryParse(repairShopIdString, out var repairShopId))
            {
                return OperationResult.Failure(new OperationError("General"));
            }

            RepairShopImageType imageType;
            if (imageTypeString == "miniature")
            {
                imageType = RepairShopImageType.Miniature;
            }else if (imageTypeString == "main")
            {
                imageType = RepairShopImageType.Main;
            }
            else
            {
                return OperationResult.Failure(new OperationError("General"));
            }

            if(!Guid.TryParse(imageIdString, out var imageId))
            {
                return OperationResult.Failure(new OperationError("General"));
            }

            await using var transaction = await dbContext.Database.BeginTransactionAsync();
            try
            {
                var image = await dbContext.Images.FindAsync(imageId);
                if(image != null)
                    return OperationResult.Success();
                
                dbContext.Images.Add(new Image
                {
                    Id=new ImageId(imageId)
                });
                await dbContext.SaveChangesAsync();

                dbContext.RepairShopImages.Add(new RepairShopImage
                {
                    ImageId = new ImageId(imageId),
                    ImageType = imageType,
                    RepairShopId = new RepairShopId(repairShopId)
                });
                await dbContext.SaveChangesAsync();
                
                await transaction.CommitAsync();
                return OperationResult.Success();
            }
            catch
            {
                return DatabaseErrors.UnknownError();
            }
        }
    }
}