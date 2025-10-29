using system_obslugi_serwisu.Application.Repairs.Book;

namespace system_obslugi_serwisu.Presentation.Repairs.Book;

public record BookRepairRequest
{
    public required string RepairShopId { get; init; }
    public required ContactInfoInput ContactInfo { get; init; }
    public required DeviceInfoInput DeviceInfo { get; init; }
    public required FaultInfoInput FaultInfo { get; init; }
    public required ReturnInfoInput ReturnInfo { get; init; }
    public string? AdditionalComment { get; init; }
}