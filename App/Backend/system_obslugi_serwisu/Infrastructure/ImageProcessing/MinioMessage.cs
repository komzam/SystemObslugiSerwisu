using System.Text.Json.Serialization;

namespace system_obslugi_serwisu.Infrastructure.ImageProcessing;

public class MinioMessage
{
    [JsonPropertyName("Records")]
    public List<MinioRecord> Records { get; set; } = new();
}

public class MinioRecord
{
    [JsonPropertyName("s3")]
    public MinioS3Info S3 { get; set; } = new();
}

public class MinioS3Info
{
    [JsonPropertyName("bucket")]
    public BucketInfo Bucket { get; set; } = new();
    [JsonPropertyName("object")]
    public ObjectInfo Object { get; set; } = new();
}

public class BucketInfo
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = String.Empty;
}

public class ObjectInfo
{
    [JsonPropertyName("key")]
    public string Key { get; set; } = String.Empty;
    
    [JsonPropertyName("userMetadata")]
    public Dictionary<string, string> Metadata { get; set; } = new();
}