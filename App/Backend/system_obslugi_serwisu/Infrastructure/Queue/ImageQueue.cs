using System.Text;
using RabbitMQ.Client;
using system_obslugi_serwisu.Application.ImageQueue;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Queue;

public class ImageQueue(QueueConnectionProvider connectionProvider) : IImageQueue
{
    public async Task<OperationResult> AddImageToProcessingQueue(string imagePath)
    {
        var connection = await connectionProvider.GetConnectionAsync();
        var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(queue: "image-processing", durable: true, exclusive: false, autoDelete: false,
            arguments: null);
        
        var body = Encoding.UTF8.GetBytes(imagePath);

        await channel.BasicPublishAsync(exchange: string.Empty, routingKey: "image-processing", body: body);

        await channel.CloseAsync();
        
        return OperationResult.Success();
    }
}