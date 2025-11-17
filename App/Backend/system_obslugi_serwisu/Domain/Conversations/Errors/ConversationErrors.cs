using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Conversations.Errors;

public static class ConversationErrors
{
    private static readonly string Prefix = "Conversations";
    
    public static OperationError ConversationNotFound(string message = "Conversation not found") =>
        new ($"{Prefix}.ConversationNotFound", message);
    
    public static OperationError AccessDenied(string message = "Access to conversation was denied") =>
        new ($"{Prefix}.AccessDenied", message);
    
    public static OperationError RepairClosed(string message = "Repair attached to this conversation is closed") =>
        new ($"{Prefix}.RepairClosed", message);
}