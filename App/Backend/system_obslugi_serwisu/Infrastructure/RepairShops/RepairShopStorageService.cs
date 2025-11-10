using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Application.Storage;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Infrastructure.S3;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.RepairShops;

public class RepairShopStorageService(IAmazonS3 s3Client, IOptions<S3Buckets> buckets) : IRepairShopStorageService
{
    public async Task<OperationResult<Image>> GetRepairShopImage(RepairShopId id)
    {
        var sizes = new[] { "sm", "md", "lg", "xl" };
        var urls = new Dictionary<string, string>();
        
        try
        {
            foreach (var size in sizes)
            {
                var getImageRequest = new GetPreSignedUrlRequest
                {
                    BucketName = buckets.Value.RepairShopImages,
                    Key = $"images/{id.Value}/{id.Value}-{size}",
                    Verb = HttpVerb.GET,
                    Expires = DateTime.Now.AddMinutes(20),
                    Protocol = Protocol.HTTP
                };

                urls[size] = await s3Client.GetPreSignedURLAsync(getImageRequest);
            }

            return new Image
            {
                Small = urls["sm"],
                Medium = urls["md"],
                Large = urls["lg"],
                ExtraLarge = urls["xl"]
            };
        }catch
        {
            return StorageErrors.UnknownError();
        }
    }
    
    public async Task<OperationResult<string>> AddRepairShopImage(RepairShopId id)
    {
        try
        {
            var getImageRequest = new GetPreSignedUrlRequest
            {
                BucketName=buckets.Value.RepairShopImages,
                Key = $"images/{id.Value}/{id.Value}",
                Verb = HttpVerb.PUT,
                Expires = DateTime.Now.AddMinutes(10),
                Protocol = Protocol.HTTP
            };
            
            return await s3Client.GetPreSignedURLAsync(getImageRequest);
        }catch
        {
            return StorageErrors.UnknownError();
        }
    }
}