using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Application.Storage;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Infrastructure.S3;
using system_obslugi_serwisu.Infrastructure.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs;

public class RepairStorageService(S3Clients s3Clients, IOptions<S3Buckets> buckets) : IRepairStorageService
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

                    urls[size] = await s3Clients.PublicClient.GetPreSignedURLAsync(getImageRequest);
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
            
            return await s3Clients.PublicClient.GetPreSignedURLAsync(putImageRequest);
        }catch
        {
            return StorageErrors.UnknownError();
        }
    }

    public async Task<OperationResult> DeleteRepairImage(RepairImage image)
    {
        try
        {
            var listObjects = new ListObjectsV2Request
            {
                BucketName=buckets.Value.RepairImages,
                Prefix = $"{image.RepairId.Value}/{image.ImageId.Value}/"
            };
            
            var objectList = await s3Clients.InternalClient.ListObjectsV2Async(listObjects);
            
            if(objectList.S3Objects.Count == 0) return OperationResult.Success();
            
            var deleteImagesRequest = new DeleteObjectsRequest
            {
                BucketName=buckets.Value.RepairImages,
                Objects = objectList.S3Objects.Select(obj => new KeyVersion{ Key = obj.Key}).ToList()
            }; 
            
            await s3Clients.InternalClient.DeleteObjectsAsync(deleteImagesRequest);   
            
            return OperationResult.Success();
        }catch
        {
            return StorageErrors.UnknownError();
        }
    }

    public async Task<OperationResult> CreateRepairDocument(RepairId repairId, TicketNumber ticketNumber)
    {
        try
        {
            var repairDocument = DocumentGenerator.GenerateRepairDocument(ticketNumber);

            var createDocumentRequest = new PutObjectRequest
            {
                BucketName = buckets.Value.RepairDocs,
                Key = $"{repairId.Value}/RepairTicket",
                InputStream = repairDocument,
                ContentType = "application/pdf"
            };

            await s3Clients.InternalClient.PutObjectAsync(createDocumentRequest);
            return OperationResult.Success();
        }
        catch
        {
            return StorageErrors.UnknownError();
        }
    }

    public async Task<OperationResult<string>> GetRepairDocument(RepairId repairId)
    {
        try
        {
            var getDocumentRequest = new GetPreSignedUrlRequest
            {
                BucketName = buckets.Value.RepairDocs,
                Key =
                    $"{repairId.Value}/RepairTicket",
                Verb = HttpVerb.GET,
                Expires = DateTime.Now.AddMinutes(20),
                Protocol = Protocol.HTTP
            };

            return await s3Clients.PublicClient.GetPreSignedURLAsync(getDocumentRequest);
        }
        catch
        {
            return StorageErrors.UnknownError();
        }
    }
}