using Amazon.S3;

namespace system_obslugi_serwisu.Infrastructure.S3;

public class S3Clients
{
    public required IAmazonS3 PublicClient { get; set; }
    public required IAmazonS3 InternalClient { get; set; }
}