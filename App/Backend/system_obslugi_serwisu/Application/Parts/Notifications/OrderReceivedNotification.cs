using MediatR;
using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Application.Parts.Notifications;

public class OrderReceivedNotification : INotification
{
    public required PartOrderId PartOrderId  { get; set; }
}