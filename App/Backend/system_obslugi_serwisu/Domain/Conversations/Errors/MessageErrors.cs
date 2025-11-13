using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Conversations.Errors;

public static class MessageErrors
{
    private static readonly string Prefix = "Messages";
    
    public static OperationError MessageNotFound(string message = "Message not found") =>
        new ($"{Prefix}.MessageNotFound", message);
    
    public static OperationError InvalidContent(string message = "Invalid message content") =>
        new ($"{Prefix}.InvalidContent", message);
    
    public static OperationError ContentTooLong(string message = "Message content is too long") =>
        new ($"{Prefix}.ContentTooLong", message);
}