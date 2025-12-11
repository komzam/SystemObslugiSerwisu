using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Presentation.Parts.Dto;

namespace system_obslugi_serwisu.Presentation.Parts;

public static class PartMapper
{
    public static PartCategoryDto ToDto(PartCategory category)
    {
        return new PartCategoryDto
        {
            Id = category.Id.Value,
            Name = category.Name
        };
    }
    
    public static PartDto ToDto(Part part)
    {
        return new PartDto
        {
            Id = part.Id.Value,
            Name = part.Name,
            ManufacturerCode = part.ManufacturerCode,
            NeedsReorder = part.NeedsReorder,
            CategoryId = part.CategoryId.Value,
            Price = part.Price,
            Stock = part.Stock,
            Reserved = part.Reserved,
            Available = part.Available,
            StockLevel = part.StockLevel,
            LowStockThreshold = part.LowStockThreshold
        };
    }
    
    public static PartNeededDto ToDto(PartNeeded partNeeded)
    {
        return new PartNeededDto
        {
            RepairId = partNeeded.RepairId.Value,
            PartId = partNeeded.PartId.Value,
            Quantity = partNeeded.Quantity
        };
    }

    public static PartReservationDto ToDto(PartReservation reservation)
    {
        return new PartReservationDto
        {
            Id = reservation.Id.Value,
            PartId = reservation.PartId.Value,
            RepairId = reservation.RepairId.Value,
            QuantityRequested = reservation.QuantityRequested,
            QuantityReserved = reservation.QuantityReserved,
            Status = reservation.Status
        };
    }
}