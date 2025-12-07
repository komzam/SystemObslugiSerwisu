using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using MediatR;
using system_obslugi_serwisu.Application.Repairs.RepairState.ApproveQuote;
using system_obslugi_serwisu.Application.Repairs.RepairState.Cancel;
using system_obslugi_serwisu.Application.Repairs.RepairState.CheckInAndQueue;
using system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairFailure;
using system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairSuccess;
using system_obslugi_serwisu.Application.Repairs.RepairState.DeclareUnfixable;
using system_obslugi_serwisu.Application.Repairs.RepairState.FinalizeDelivery;
using system_obslugi_serwisu.Application.Repairs.RepairState.PartsArrived;
using system_obslugi_serwisu.Application.Repairs.RepairState.PartsNeeded;
using system_obslugi_serwisu.Application.Repairs.RepairState.PaymentCompleted;
using system_obslugi_serwisu.Application.Repairs.RepairState.Pickup;
using system_obslugi_serwisu.Application.Repairs.RepairState.RejectQuote;
using system_obslugi_serwisu.Application.Repairs.RepairState.ReportComplaint;
using system_obslugi_serwisu.Application.Repairs.RepairState.ResolveComplaint;
using system_obslugi_serwisu.Application.Repairs.RepairState.Ship;
using system_obslugi_serwisu.Application.Repairs.RepairState.StartDiagnosis;
using system_obslugi_serwisu.Application.Repairs.RepairState.StartRepair;
using system_obslugi_serwisu.Application.Repairs.RepairState.SubmitQuote;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.Repairs.RepairState.Requests;

namespace system_obslugi_serwisu.Presentation.Repairs.RepairState;

public class RepairActions
{
    private readonly IMediator _mediator;

    public RepairActions([Service] IMediator mediator)
    {
        _mediator = mediator;
    }

    
    [Authorize]
    public async Task<bool> CheckInAndQueue(ClaimsPrincipal claimsPrincipal, CheckInAndQueueRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var checkInAndQueueResult = await _mediator.Send(new CheckInAndQueueCommand
        {
            RepairId = request.RepairId,
            WorkerId = workerId,
            Description = request.Description
        });
        if(checkInAndQueueResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(checkInAndQueueResult.Error.GetUserMessage())
                .SetCode(checkInAndQueueResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> StartDiagnosis(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var startDiagnosisResult = await _mediator.Send(new StartDiagnosisCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(startDiagnosisResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(startDiagnosisResult.Error.GetUserMessage())
                .SetCode(startDiagnosisResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> SubmitQuote(ClaimsPrincipal claimsPrincipal, SubmitQuoteRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var submitQuoteResult = await _mediator.Send(new SubmitQuoteCommand
        {
            RepairId = request.RepairId,
            WorkerId = workerId,
            Currency = request.Currency,
            LaborCost = request.LaborCost,
            PartsCost = request.PartsCost,
            Description = request.Description
        });
        if(submitQuoteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(submitQuoteResult.Error.GetUserMessage())
                .SetCode(submitQuoteResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> DeclareUnfixable(ClaimsPrincipal claimsPrincipal, DeclareUnfixableRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var declareUnfixableResult = await _mediator.Send(new DeclareUnfixableCommand
        {
            RepairId = request.RepairId,
            WorkerId = workerId,
            Description = request.Description
        });
        if(declareUnfixableResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(declareUnfixableResult.Error.GetUserMessage())
                .SetCode(declareUnfixableResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    [ActingRoleMiddleware]
    public async Task<bool> ApproveQuote(ClaimsPrincipal claimsPrincipal, IResolverContext resolverContext, Guid repairId)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        var approveQuoteResult = await _mediator.Send(new ApproveQuoteCommand
        {
            RepairId = repairId,
            UserId = userId,
            ActingRole = role
        });
        if(approveQuoteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(approveQuoteResult.Error.GetUserMessage())
                .SetCode(approveQuoteResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    [ActingRoleMiddleware]
    public async Task<bool> RejectQuote(ClaimsPrincipal claimsPrincipal, IResolverContext resolverContext, Guid repairId)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        var rejectQuoteResult = await _mediator.Send(new RejectQuoteCommand
        {
            RepairId = repairId,
            UserId = userId,
            ActingRole = role
        });
        if(rejectQuoteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(rejectQuoteResult.Error.GetUserMessage())
                .SetCode(rejectQuoteResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> StartRepair(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var startRepairResult = await _mediator.Send(new StartRepairCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(startRepairResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(startRepairResult.Error.GetUserMessage())
                .SetCode(startRepairResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> PartsNeeded(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var partsNeededResult = await _mediator.Send(new PartsNeededCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(partsNeededResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(partsNeededResult.Error.GetUserMessage())
                .SetCode(partsNeededResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> PartsArrived(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var partsArrivedResult = await _mediator.Send(new PartsArrivedCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(partsArrivedResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(partsArrivedResult.Error.GetUserMessage())
                .SetCode(partsArrivedResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> CompleteRepairSuccess(ClaimsPrincipal claimsPrincipal, CompleteRepairSuccessRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var completeRepairSuccessResult = await _mediator.Send(new CompleteRepairSuccessCommand
        {
            RepairId = request.RepairId,
            WorkerId = workerId,
            FinalCost = request.FinalCost,
            FinalCostCurrency = request.FinalCostCurrency,
            Description = request.Description
        });
        if(completeRepairSuccessResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(completeRepairSuccessResult.Error.GetUserMessage())
                .SetCode(completeRepairSuccessResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> CompleteRepairFailure(ClaimsPrincipal claimsPrincipal, CompleteRepairFailureRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var completeRepairFailureResult = await _mediator.Send(new CompleteRepairFailureCommand
        {
            RepairId = request.RepairId,
            WorkerId = workerId,
            Description = request.Description
        });
        if(completeRepairFailureResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(completeRepairFailureResult.Error.GetUserMessage())
                .SetCode(completeRepairFailureResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> PaymentCompleted(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var paymentCompletedResult = await _mediator.Send(new PaymentCompletedCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(paymentCompletedResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(paymentCompletedResult.Error.GetUserMessage())
                .SetCode(paymentCompletedResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> Pickup(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var pickupResult = await _mediator.Send(new PickupCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(pickupResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(pickupResult.Error.GetUserMessage())
                .SetCode(pickupResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> Ship(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var shipResult = await _mediator.Send(new ShipCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(shipResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(shipResult.Error.GetUserMessage())
                .SetCode(shipResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    [ActingRoleMiddleware]
    public async Task<bool> FinalizeDelivery(ClaimsPrincipal claimsPrincipal, IResolverContext resolverContext, Guid repairId)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        var finalizeDeliveryResult = await _mediator.Send(new FinalizeDeliveryCommand
        {
            RepairId = repairId,
            UserId = userId,
            ActingRole = role
        });
        if(finalizeDeliveryResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(finalizeDeliveryResult.Error.GetUserMessage())
                .SetCode(finalizeDeliveryResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    /*[Authorize]
    public async Task<bool> Cancel(Guid repairId)
    {
        var cancelResult = await _mediator.Send(new CancelCommand { RepairId = repairId });
        if(cancelResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(cancelResult.Error.GetUserMessage())
                .SetCode(cancelResult.Error.GetUserCode())
                .Build());

        return true;
    }*/
    
    [Authorize]
    public async Task<bool> ReportComplaint(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var reportComplaintResult = await _mediator.Send(new ReportComplaintCommand
        {
            RepairId = repairId,
            CustomerId = customerId
        });
        if(reportComplaintResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(reportComplaintResult.Error.GetUserMessage())
                .SetCode(reportComplaintResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> ResolveComplaint(ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var resolveComplaintResult = await _mediator.Send(new ResolveComplaintCommand
        {
            RepairId = repairId,
            WorkerId = workerId
        });
        if(resolveComplaintResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(resolveComplaintResult.Error.GetUserMessage())
                .SetCode(resolveComplaintResult.Error.GetUserCode())
                .Build());

        return true;
    }
}