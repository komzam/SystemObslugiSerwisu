using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Customers.ChangeAddress;
using system_obslugi_serwisu.Application.Customers.ChangePhoneNumber;
using system_obslugi_serwisu.Application.Customers.ChangePreferredContact;
using system_obslugi_serwisu.Application.Customers.ChangePreferredReturn;
using system_obslugi_serwisu.Application.Customers.Register;
using system_obslugi_serwisu.Application.Customers.RemoveAddress;
using system_obslugi_serwisu.Application.Customers.RemovePhoneNumber;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Presentation.Customers.ChangeAddress;
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
    
    [Authorize]
    public async Task<bool> RemovePhoneNumber(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var removePhoneNumberResult = await mediatr.Send(new RemoveCustomerPhoneNumberCommand
        {
            CustomerId = customerId
        });
        if (removePhoneNumberResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(removePhoneNumberResult.Error.GetUserMessage())
                .SetCode(removePhoneNumberResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> ChangeAddress(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        ChangeAddressRequest request)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var changeAddressResult = await mediatr.Send(new ChangeCustomerAddressCommand
        {
            CustomerId = customerId,
            RecipientName = request.RecipientName,
            Street = request.Street,
            BuildingNumber = request.BuildingNumber,
            ApartmentNumber = request.ApartmentNumber,
            City = request.City,
            PostalCode = request.PostalCode,
            Country = request.Country
        });
        if (changeAddressResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(changeAddressResult.Error.GetUserMessage())
                .SetCode(changeAddressResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> RemoveAddress(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var removeAddressResult = await mediatr.Send(new RemoveCustomerAddressCommand
        {
            CustomerId = customerId
        });
        if (removeAddressResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(removeAddressResult.Error.GetUserMessage())
                .SetCode(removeAddressResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> ChangePreferredContact(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        ContactMethod? contactMethod)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var changePreferredContactResult = await mediatr.Send(new ChangeCustomerPreferredContactCommand
        {
            CustomerId = customerId,
            ContactMethod = contactMethod
        });
        if (changePreferredContactResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(changePreferredContactResult.Error.GetUserMessage())
                .SetCode(changePreferredContactResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> ChangePreferredReturn(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        ReturnMethod? returnMethod)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var changePreferredReturnResult = await mediatr.Send(new ChangeCustomerPreferredReturnCommand
        {
            CustomerId = customerId,
            ReturnMethod = returnMethod
        });
        if (changePreferredReturnResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(changePreferredReturnResult.Error.GetUserMessage())
                .SetCode(changePreferredReturnResult.Error.GetUserCode())
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