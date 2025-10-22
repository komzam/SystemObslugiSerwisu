using MediatR;
using system_obslugi_serwisu.Application.Customers.Login;
using system_obslugi_serwisu.Application.Customers.Logout;
using system_obslugi_serwisu.Application.Customers.Register;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Customers;


[ExtendObjectType(typeof(Mutation))]
public class CustomerMutations
{
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

    public async Task<bool> Login([Service] IMediator mediatr, LoginRequest request)
    {
        var customerResult = await mediatr.Send(new LoginCustomerCommand
            { Email = request.Email, Password = request.Password, RememberMe = request.RememberMe });
        if (customerResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(customerResult.Error.GetUserMessage())
                .SetCode(customerResult.Error.GetUserCode())
                .Build());

        return true;
    }

    public async Task<bool> Logout([Service] IMediator mediatr)
    {
        var customerResult = await mediatr.Send(new LogoutCustomerCommand());
        if (customerResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(customerResult.Error.GetUserMessage())
                .SetCode(customerResult.Error.GetUserCode())
                .Build());

        return true;
    }
}