using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Application.Storage;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Infrastructure.S3;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs;

public class RepairStorageService(IAmazonS3 s3Client, IOptions<S3Buckets> buckets) : IRepairStorageService
{
    public async Task<OperationResult<List<ImageDto>>> GetRepairImages(List<RepairImage> repairImages)
    {
        var sizes = new[] { "sm", "md", "lg", "xl" };
        var urls = new Dictionary<string, string>();
        List<ImageDto> images = new();
        
        try
        {
            foreach (var image in repairImages)
            {
                foreach (var size in sizes)
                {
                    var getImageRequest = new GetPreSignedUrlRequest
                    {
                        BucketName = buckets.Value.RepairImages,
                        Key =
                            $"{image.RepairId.Value}/{image.ImageId.Value}/{image.ImageId.Value}-{size}",
                        Verb = HttpVerb.GET,
                        Expires = DateTime.Now.AddMinutes(20),
                        Protocol = Protocol.HTTP
                    };

                    urls[size] = await s3Client.GetPreSignedURLAsync(getImageRequest);
                }

                images.Add(new ImageDto
                {
                    Id = image.ImageId,
                    Small = urls["sm"],
                    Medium = urls["md"],
                    Large = urls["lg"],
                    ExtraLarge = urls["xl"]
                });
            }

            return images;
        }catch
        {
            return StorageErrors.UnknownError();
        }
    }

    public async Task<OperationResult<string>> AddRepairImage(RepairImage image, string contentType)
    {
        try
        {
            var putImageRequest = new GetPreSignedUrlRequest
            {
                BucketName=buckets.Value.RepairImages,
                Key = $"{image.RepairId.Value}/{image.ImageId.Value}/{image.ImageId.Value}",
                Verb = HttpVerb.PUT,
                Expires = DateTime.Now.AddMinutes(10),
                ContentType = contentType,
                Protocol = Protocol.HTTP
            };
            
            return await s3Client.GetPreSignedURLAsync(putImageRequest);
        }catch
        {
            return StorageErrors.UnknownError();
        }
    }
}