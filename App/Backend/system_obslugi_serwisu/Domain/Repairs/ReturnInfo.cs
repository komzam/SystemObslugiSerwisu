using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public class ReturnInfo : ValueObject
{
    public const int ManufacturerMaxLength = 50;
    
    
    public ReturnMethod ReturnMethod { get; private set; }
    public Address? ReturnAddress { get; private set; }

    private ReturnInfo() { }

    private ReturnInfo(ReturnMethod returnMethod, Address? address)
    {
        ReturnMethod = returnMethod;
        ReturnAddress = address;
    }
    
    public static OperationResult<ReturnInfo> Create(ReturnMethod returnMethod, Address? address)
    {
        if (returnMethod == ReturnMethod.CourierDelivery && address == null)
            return ReturnInfoErrors.ReturnAddressMissing();
        
        return new ReturnInfo(returnMethod, address);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return ReturnMethod;
        if (ReturnAddress is not null)
        {
            foreach (var value in ReturnAddress.GetAtomicValues())
            {
                yield return value;
            }
        }
        else
        {
            yield return null!; 
        }
    }
}