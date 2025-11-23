using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity.ChangePassword;

public class ChangePasswordHandler(IUnitOfWork unitOfWork, IIdentityController identityController) : IRequestHandler<ChangePasswordCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var changePasswordResult = await identityController.ChangePassword(request.UserId, request.CurrentPassword, request.NewPassword);
        if(changePasswordResult.IsFailure)
            return changePasswordResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}