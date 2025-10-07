using System.Security.Claims;
using MediatR;
using system_obslugi_serwisu.Application.Customers.Get;
using system_obslugi_serwisu.Presentation.Customers;

namespace system_obslugi_serwisu.Presentation;

public class Query
{
    public async Task<CustomerDto> Me([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var customerResult = await mediatr.Send(new GetCustomerCommand{ Id = customerId });
        if(customerResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(customerResult.Error.Message)
                .SetCode(customerResult.Error.Code)
                .Build());
        
        return CustomerMapper.ToDto(customerResult.Value);
    }
}