using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts;

public record PartNeededId(Guid Value);
public class PartNeeded
{
    public PartNeededId Id { get; private set; }
    public RepairId RepairId { get; private set; }
    public PartId PartId { get; private set; }
    public int Quantity { get; private set; }
    
    private PartNeeded(){}

    private PartNeeded(RepairId repairId, PartId partId, int quantity)
    {
        Id = new PartNeededId(Guid.NewGuid());
        RepairId = repairId;
        PartId = partId;
        Quantity = quantity;
    }
    
    public static OperationResult<PartNeeded> Create(RepairId repairId, PartId partId, int quantity)
    {
        if (quantity <= 0)
            return PartErrors.InvalidPartNeededQuantity();
        
        return new PartNeeded(repairId, partId, quantity);
    }
}