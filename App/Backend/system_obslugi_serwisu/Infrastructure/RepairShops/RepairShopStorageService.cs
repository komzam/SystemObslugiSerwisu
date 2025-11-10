using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Application.Storage;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Infrastructure.S3;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.RepairShops;

public class RepairShopStorageService(IAmazonS3 s3Client, IOptions<S3Buckets> buckets) : IRepairShopStorageService
{
    public async Task<OperationResult<string>> GetRepairShopImage(RepairShopId id)
    {
        try
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
        }
    }
    
    public async Task<OperationResult<string>> AddRepairShopImage(RepairShopId id)
    {
        try
        {
            var getImageRequest = new GetPreSignedUrlRequest
            {
                BucketName=buckets.Value.RepairShopImages,
                Key = $"images/{id.Value}/{id.Value}-og",
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