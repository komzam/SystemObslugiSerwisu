using RabbitMQ.Client;

namespace system_obslugi_serwisu.Infrastructure.Queue;

public class QueueConnectionProvider(IConnectionFactory connectionFactory) : IAsyncDisposable
{
    private IConnection? _connection;

    public async Task<IConnection> GetConnectionAsync(CancellationToken cancellationToken = default)
    {
        if (_connection == null || !_connection.IsOpen)
        {
            _connection = await connectionFactory.CreateConnectionAsync(cancellationToken: cancellationToken);
        }

        return _connection;
    }

    public async ValueTask DisposeAsync()
    {
        if (_connection != null)
        {
            await _connection.CloseAsync();
            await _connection.DisposeAsync();
        }
    }
}