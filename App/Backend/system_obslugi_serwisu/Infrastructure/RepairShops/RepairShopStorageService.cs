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
    private readonly Dictionary<RepairShopImageType, string> _typeDirectoryNameMap = new()
    {
        [RepairShopImageType.Main] = "main",
        [RepairShopImageType.Miniature] = "miniature"
    };
    
    public async Task<OperationResult<ImageDto>> GetRepairShopImage(RepairShopImage image)
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
                    Key = $"{image.RepairShopId.Value}/{_typeDirectoryNameMap[image.ImageType]}/{image.ImageId.Value}-{size}",
                    Verb = HttpVerb.GET,
                    Expires = DateTime.Now.AddMinutes(20),
                    Protocol = Protocol.HTTP
                };

                urls[size] = await s3Client.GetPreSignedURLAsync(getImageRequest);
            }

            return new ImageDto
            {
                Id = image.ImageId,
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
    
    public async Task<OperationResult<string>> AddRepairShopImage(RepairShopImage image)
    {
        try
        {
            var putImageRequest = new GetPreSignedUrlRequest
            {
                BucketName=buckets.Value.RepairShopImages,
                Key = $"{image.RepairShopId.Value}/{_typeDirectoryNameMap[image.ImageType]}/{image.ImageId.Value}",
                Verb = HttpVerb.PUT,
                Expires = DateTime.Now.AddMinutes(10),
                Protocol = Protocol.HTTP
            };
            
            return await s3Client.GetPreSignedURLAsync(putImageRequest);
        }catch
        {
            return StorageErrors.UnknownError();
        }
    }
}