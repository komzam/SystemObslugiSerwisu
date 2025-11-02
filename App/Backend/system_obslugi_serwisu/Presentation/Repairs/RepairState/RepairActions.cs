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

namespace system_obslugi_serwisu.Presentation.Repairs.RepairState;

public class RepairActions
{
    private readonly IMediator _mediator;

    public RepairActions([Service] IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task<bool> CheckInAndQueue(Guid repairId)
    {
        var checkInAndQueueResult = await _mediator.Send(new CheckInAndQueueCommand { RepairId = repairId });
        if(checkInAndQueueResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(checkInAndQueueResult.Error.GetUserMessage())
                .SetCode(checkInAndQueueResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> StartDiagnosis(Guid repairId)
    {
        var startDiagnosisResult = await _mediator.Send(new StartDiagnosisCommand{ RepairId = repairId });
        if(startDiagnosisResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(startDiagnosisResult.Error.GetUserMessage())
                .SetCode(startDiagnosisResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> SubmitQuote(Guid repairId)
    {
        var submitQuoteResult = await _mediator.Send(new SubmitQuoteCommand { RepairId = repairId });
        if(submitQuoteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(submitQuoteResult.Error.GetUserMessage())
                .SetCode(submitQuoteResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> DeclareUnfixable(Guid repairId)
    {
        var declareUnfixableResult = await _mediator.Send(new DeclareUnfixableCommand { RepairId = repairId });
        if(declareUnfixableResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(declareUnfixableResult.Error.GetUserMessage())
                .SetCode(declareUnfixableResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> ApproveQuote(Guid repairId)
    {
        var approveQuoteResult = await _mediator.Send(new ApproveQuoteCommand { RepairId = repairId });
        if(approveQuoteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(approveQuoteResult.Error.GetUserMessage())
                .SetCode(approveQuoteResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> RejectQuote(Guid repairId)
    {
        var rejectQuoteResult = await _mediator.Send(new RejectQuoteCommand { RepairId = repairId });
        if(rejectQuoteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(rejectQuoteResult.Error.GetUserMessage())
                .SetCode(rejectQuoteResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> StartRepair(Guid repairId)
    {
        var startRepairResult = await _mediator.Send(new StartRepairCommand { RepairId = repairId });
        if(startRepairResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(startRepairResult.Error.GetUserMessage())
                .SetCode(startRepairResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> PartsNeeded(Guid repairId)
    {
        var partsNeededResult = await _mediator.Send(new PartsNeededCommand { RepairId = repairId });
        if(partsNeededResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(partsNeededResult.Error.GetUserMessage())
                .SetCode(partsNeededResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> PartsArrived(Guid repairId)
    {
        var partsArrivedResult = await _mediator.Send(new PartsArrivedCommand { RepairId = repairId });
        if(partsArrivedResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(partsArrivedResult.Error.GetUserMessage())
                .SetCode(partsArrivedResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> CompleteRepairSuccess(Guid repairId)
    {
        var completeRepairSuccessResult = await _mediator.Send(new CompleteRepairSuccessCommand { RepairId = repairId });
        if(completeRepairSuccessResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(completeRepairSuccessResult.Error.GetUserMessage())
                .SetCode(completeRepairSuccessResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> CompleteRepairFailure(Guid repairId)
    {
        var completeRepairFailureResult = await _mediator.Send(new CompleteRepairFailureCommand { RepairId = repairId });
        if(completeRepairFailureResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(completeRepairFailureResult.Error.GetUserMessage())
                .SetCode(completeRepairFailureResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> PaymentCompleted(Guid repairId)
    {
        var paymentCompletedResult = await _mediator.Send(new PaymentCompletedCommand { RepairId = repairId });
        if(paymentCompletedResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(paymentCompletedResult.Error.GetUserMessage())
                .SetCode(paymentCompletedResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> Pickup(Guid repairId)
    {
        var pickupResult = await _mediator.Send(new PickupCommand { RepairId = repairId });
        if(pickupResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(pickupResult.Error.GetUserMessage())
                .SetCode(pickupResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> Ship(Guid repairId)
    {
        var shipResult = await _mediator.Send(new ShipCommand { RepairId = repairId });
        if(shipResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(shipResult.Error.GetUserMessage())
                .SetCode(shipResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> FinalizeDelivery(Guid repairId)
    {
        var finalizeDeliveryResult = await _mediator.Send(new FinalizeDeliveryCommand { RepairId = repairId });
        if(finalizeDeliveryResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(finalizeDeliveryResult.Error.GetUserMessage())
                .SetCode(finalizeDeliveryResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> Cancel(Guid repairId)
    {
        var cancelResult = await _mediator.Send(new CancelCommand { RepairId = repairId });
        if(cancelResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(cancelResult.Error.GetUserMessage())
                .SetCode(cancelResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> ReportComplaint(Guid repairId)
    {
        var reportComplaintResult = await _mediator.Send(new ReportComplaintCommand { RepairId = repairId });
        if(reportComplaintResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(reportComplaintResult.Error.GetUserMessage())
                .SetCode(reportComplaintResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> ResolveComplaint(Guid repairId)
    {
        var resolveComplaintResult = await _mediator.Send(new ResolveComplaintCommand { RepairId = repairId });
        if(resolveComplaintResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(resolveComplaintResult.Error.GetUserMessage())
                .SetCode(resolveComplaintResult.Error.GetUserCode())
                .Build());

        return true;
    }
}