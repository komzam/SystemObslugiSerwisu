using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Users;
using system_obslugi_serwisu.Domain.Workers.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Workers;

public record WorkerId(Guid Value);

public class Worker : User
{
    public const int FirstNameMaxLength = 50;
    public const int LastNameMaxLength = 50;
    
    public WorkerId Id { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public RepairShopId? RepairShopId { get; private set; }

    private Worker(){}

    private Worker(string firstName, string lastName)
    {
        Id = new WorkerId(Guid.NewGuid());
        FirstName = firstName;
        LastName = lastName;
    }

    private static OperationResult ValidateInput(string firstName, string lastName)
    {
        if (String.IsNullOrWhiteSpace(firstName))
            return WorkerErrors.InvalidFirstName();
        
        if(firstName.Length > FirstNameMaxLength)
            return WorkerErrors.FirstNameTooLong();
        
        if(String.IsNullOrWhiteSpace(lastName))
            return WorkerErrors.InvalidLastName();
        
        if(lastName.Length > LastNameMaxLength)
            return WorkerErrors.LastNameTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<Worker> Create(string firstName, string lastName)
    {
        firstName = firstName.Trim();
        lastName = lastName.Trim();
        
        var validationResult = ValidateInput(firstName, lastName);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new Worker(firstName, lastName);
    }

    public bool IsWorkingAt(RepairShopId repairShopId) => RepairShopId is not null && RepairShopId == repairShopId;
}