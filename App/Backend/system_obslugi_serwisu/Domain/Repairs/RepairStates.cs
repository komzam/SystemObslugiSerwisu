using Stateless;
using system_obslugi_serwisu.Domain.Actors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Repairs.RepairStateMachine;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.SystemActors;
using system_obslugi_serwisu.Domain.Users;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public partial class Repair
{
    private StateMachine<RepairStatus, RepairTrigger> StateMachine {
        get
        {
            if (_fsm == null)
                _fsm = RepairStateMachineFactory.Create(
                    () => Status,
                    s => Status = s,
                    AddRepairStep,
                    this);
            return _fsm;
        }
    }

    private StateMachine<RepairStatus, RepairTrigger>? _fsm;
    
    private async Task<OperationResult> FireTriggerAsync(RepairTrigger trigger, string? description = null)
    {
        if (!StateMachine.CanFire(trigger))
            return RepairErrors.InvalidTrigger();
        
        await StateMachine.FireAsync(trigger, description);
        
        return OperationResult.Success();
    }
    
    public async Task<OperationResult> FinalizeBooking()
    {
        return await FireTriggerAsync(RepairTrigger.FinalizeBooking);
    }
    
    public async Task<OperationResult> CheckIn(Worker worker, string? description = null)
    {
        if (!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        return await FireTriggerAsync(RepairTrigger.CheckIn, description);
    }
    
    public async Task<OperationResult> QueueForDiagnosis(Worker worker)
    {
        if (!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.QueueForDiagnosis);
    }
    
    public async Task<OperationResult> StartDiagnosis(Worker worker)
    {
        if (!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.StartDiagnosis);
    }
    
    public async Task<OperationResult> SubmitQuote(Worker worker, Quote quote, string? description = null)
    {
        if (!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        Quote = quote;
        return await FireTriggerAsync(RepairTrigger.SubmitQuote, description);
    }

    public async Task<OperationResult> DeclareUnfixable(Worker worker, string? description = null)
    {
        if (!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
     
        return await FireTriggerAsync(RepairTrigger.DeclareUnfixable, description);
    }
    
    public async Task<OperationResult> FinalizeUnfixable(Worker worker, Money? repairShopDiagnosticFee)
    {
        if (!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        if(DiagnosisFee == null)
            DiagnosisFee = repairShopDiagnosticFee;
        
        return await FireTriggerAsync(RepairTrigger.FinalizeUnfixable);
    }
    
    public async Task<OperationResult> ApproveQuote(User user)
    {
        if (user is Customer customer)
        {
            if(customer.Id != CustomerId)
                return RepairErrors.AccessDenied();
        }else if (user is Worker worker)
        {
            if (!worker.IsWorkingAt(RepairShopId))
                return RepairErrors.AccessDenied();
        }
        else
        {
            return RepairErrors.AccessDenied();
        }

        return await FireTriggerAsync(RepairTrigger.ApproveQuote);
    }
    
    public async Task<OperationResult> RejectQuote(User user, Money? repairShopDiagnosticFee)
    {
        if (user is Customer customer)
        {
            if(customer.Id != CustomerId)
                return RepairErrors.AccessDenied();
        }else if (user is Worker worker)
        {
            if (!worker.IsWorkingAt(RepairShopId))
                return RepairErrors.AccessDenied();
        }
        else
        {
            return RepairErrors.AccessDenied();
        }
        
        if(DiagnosisFee == null)
            DiagnosisFee = repairShopDiagnosticFee;
        
        return await FireTriggerAsync(RepairTrigger.RejectQuote);
    }
    
    public async Task<OperationResult> StartRepair(Worker worker)
    {
        if (worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.StartRepair);
    }

    public async Task<OperationResult> PartsNeeded(IActor actor)
    {
        if (actor is Worker worker)
        {
            if (worker.IsWorkingAt(RepairShopId))
                return RepairErrors.AccessDenied();
        }else if (actor is SystemActor system) { }
        else
        {
            return RepairErrors.AccessDenied();
        }

        return await FireTriggerAsync(RepairTrigger.PartsNeeded);
    }
    
    public async Task<OperationResult> PartsArrived(IActor actor)
    {
        if (actor is Worker worker)
        {
            if (worker.IsWorkingAt(RepairShopId))
                return RepairErrors.AccessDenied();
        }else if (actor is SystemActor system) { }
        else
        {
            return RepairErrors.AccessDenied();
        }
        
        return await FireTriggerAsync(RepairTrigger.PartsArrived);
    }

    public async Task<OperationResult> CompleteRepairSuccess(Worker worker, Money? finalCost, string? description = null)
    {
        if(!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;

        if (finalCost == null)
            FinalCost = Quote.TotalCost;
        else
            FinalCost = finalCost;
        return await FireTriggerAsync(RepairTrigger.CompleteRepairSuccess, description);
    }

    public async Task<OperationResult> CompleteRepairFailure(Worker worker, string? description = null)
    {
        if(!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        return await FireTriggerAsync(RepairTrigger.CompleteRepairFailure, description);
    }

    public async Task<OperationResult> FinalizeFailedRepair(Worker worker)
    {
        if(!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.FinalizeFailedRepair);
    }
    
    public async Task<OperationResult> PaymentCompleted(IActor actor)
    {
        if (actor is Worker worker)
        {
            if (worker.IsWorkingAt(RepairShopId))
                return RepairErrors.AccessDenied();
        }else if (actor is SystemActor system) { }
        else
        {
            return RepairErrors.AccessDenied();
        }
        
        return await FireTriggerAsync(RepairTrigger.PaymentCompleted);
    }
    
    public async Task<OperationResult> Pickup(Worker worker)
    {
        if(!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.Pickup);
    }
    
    public async Task<OperationResult> Ship(Worker worker)
    {
        if(!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.Ship);
    }
    
    public async Task<OperationResult> FinalizeDelivery(User user)
    {
        if (user is Customer customer)
        {
            if(customer.Id != CustomerId)
                return RepairErrors.AccessDenied();
        }else if (user is Worker worker)
        {
            if (!worker.IsWorkingAt(RepairShopId))
                return RepairErrors.AccessDenied();
        }
        else
        {
            return RepairErrors.AccessDenied();
        }
        
        return await FireTriggerAsync(RepairTrigger.FinalizeDelivery);
    }
    
    public async Task<OperationResult> Cancel()
    {
        return await FireTriggerAsync(RepairTrigger.Cancel);
    }

    public async Task<OperationResult> ReportComplaint(Customer customer)
    {
        if(customer.Id != CustomerId)
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.ReportComplaint);
    }
    
    public async Task<OperationResult> ResolveComplaint(Worker worker)
    {
        if(!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();
        
        return await FireTriggerAsync(RepairTrigger.ResolveComplaint);
    }
}