using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Customers.ChangePhoneNumber;
using system_obslugi_serwisu.Application.Customers.Login;
using system_obslugi_serwisu.Application.Customers.Logout;
using system_obslugi_serwisu.Application.Customers.Register;
using system_obslugi_serwisu.Application.Identity.ChangeEmail;
using system_obslugi_serwisu.Presentation.Auth.ChangeEmail;
using system_obslugi_serwisu.Presentation.Customers.ChangePhoneNumber;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Customers;


[ExtendObjectType(typeof(Mutation))]
public class CustomerMutations
{
    [Authorize]
    public async Task<bool> ChangePhoneNumber(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        ChangePhoneNumberRequest request)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var changePhoneNumberResult = await mediatr.Send(new ChangeCustomerPhoneNumberCommand
        {
            CustomerId = customerId,
            NewPhoneNumber = request.NewPhoneNumber,
            RegionCode = request.RegionCode
        });
        if (changePhoneNumberResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(changePhoneNumberResult.Error.GetUserMessage())
                .SetCode(changePhoneNumberResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    public async Task<bool> Register([Service] IMediator mediatr, RegisterRequest request)
    {
        var customerResult = await mediatr.Send(new RegisterCustomerCommand
        {
            Email = request.Email,
            Password = request.Password,
            IsBusiness = request.IsBusiness,
            FirstName = request.FirstName,
            LastName = request.LastName,
            CompanyName = request.CompanyName,
            TaxIdNumber = request.TaxIdNumber,
        });
        if (customerResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(customerResult.Error.GetUserMessage())
                .SetCode(customerResult.Error.GetUserCode())
                .Build());

        return true;
    }
}