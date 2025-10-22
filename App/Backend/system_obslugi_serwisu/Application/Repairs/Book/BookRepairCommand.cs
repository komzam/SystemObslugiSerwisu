using MediatR;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.Book;

public class BookRepairCommand : IRequest<OperationResult<Repair>>
{
    public required Guid RepairShopId { get; init; }
    public Guid? CustomerId { get; init; }
    public required ContactInfoInput ContactInfo { get; init; }
    public required DeviceInfoInput DeviceInfo { get; init; }
    public required FaultInfoInput FaultInfo { get; init; }
    public required ReturnInfoInput ReturnInfo { get; init; }
}

public record ContactInfoInput
{
    public string? FullName { get; init; }
    public string? Email { get; init; }
    public required string PhoneRegionCode { get; init; }
    public required string PhoneNumber { get; init; }
    public required ContactMethod PreferredContactMethod { get; init; }
}

public record DeviceInfoInput
{
    public required DeviceType DeviceType { get; init; }
    public required string Manufacturer { get; init; }
    public required string Model { get; init; }
    public required string SerialNumber { get; init; }
}

public record FaultInfoInput
{
    public required string WhenOccured { get; init; }
    public required string HowToReproduce { get; init; }
    public required string Description { get; init; }
    public required bool PreviouslyRepaired { get; init; }
}

public record ReturnInfoInput{
    public required ReturnMethod ReturnMethod { get; init; }
    public AddressInput? Address { get; init; } 
}

public record AddressInput
{
    public required string RecipientName { get; init; }
    public required string Street { get; init; }
    public required string BuildingNumber { get; init; }
    public string? ApartmentNumber { get; init; }
    public required string PostalCode { get; init; }

    public required string City { get; init; }
    public required Country Country { get; init; }
}