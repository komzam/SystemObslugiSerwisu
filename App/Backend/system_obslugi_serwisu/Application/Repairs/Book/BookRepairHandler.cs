using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.Book;

public class BookRepairHandler(IUnitOfWork unitOfWork) : IRequestHandler<BookRepairCommand, OperationResult<Repair>>
{
    public async Task<OperationResult<Repair>> Handle(BookRepairCommand request, CancellationToken cancellationToken)
    {
        Customer? customer = null;
        if (request.CustomerId.HasValue)
        {
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId.Value));
            if (customerResult.IsFailure)
                return customerResult.Error;
            customer = customerResult.Value;
        }
        
        var repairShopResult = await unitOfWork.RepairShopRepository.Get(new RepairShopId(request.RepairShopId));
        if(repairShopResult.IsFailure)
            return repairShopResult.Error;
        
        var contactInfoResult = CreateContactInfo(customer, request.ContactInfo);
        if(contactInfoResult.IsFailure)
            return contactInfoResult.Error;

        var deviceInfoResult = CreateDeviceInfo(request.DeviceInfo);
        if(deviceInfoResult.IsFailure)
            return deviceInfoResult.Error;
        
        var faultInfoResult = CreateFaultInfo(request.FaultInfo);
        if(faultInfoResult.IsFailure)
            return faultInfoResult.Error;
        
        var returnInfoResult = CreateReturnInfo(request.ReturnInfo);
        if(returnInfoResult.IsFailure)
            return returnInfoResult.Error;

        var repairResult = Repair.Create(new RepairData
        {
            RepairShopId = repairShopResult.Value.Id,
            CustomerId = customer?.Id,
            ContactInfo = contactInfoResult.Value,
            DeviceInfo = deviceInfoResult.Value,
            FaultInfo = faultInfoResult.Value,
            ReturnInfo = returnInfoResult.Value,
            AdditionalComment = request.AdditionalComment
        });
        if(repairResult.IsFailure)
            return repairResult.Error;

        var finalizeResult = await repairResult.Value.FinalizeBooking();
        if(finalizeResult.IsFailure)
            return finalizeResult.Error;
        
        var createResult = await unitOfWork.RepairRepository.CreateRepair(repairResult.Value);
        if(createResult.IsFailure)
            return createResult.Error;
        
        if(repairResult.Value.CustomerId != null){
            var conversationResult = Conversation.CreateForRepair(repairResult.Value.RepairShopId, repairResult.Value.CustomerId, repairResult.Value.Id);
            if(conversationResult.IsFailure)
                return conversationResult.Error;
            
            var conversationAddResult = await unitOfWork.ConversationRepository.CreateConversation(conversationResult.Value);
            if(conversationAddResult.IsFailure)
                return conversationAddResult.Error;
            
            repairResult.Value.AssignConversation(conversationResult.Value.Id);
        }

        var saveChangesResult = await unitOfWork.SaveChanges();
        if(saveChangesResult.IsFailure)
            return saveChangesResult.Error;

        return repairResult.Value;
    }

    private OperationResult<ContactInfo> CreateContactInfo(Customer? customer, ContactInfoInput contactInfoInput)
    {
        OperationResult<ContactInfo> contactInfoResult;
        
        if (customer == null)
        { 
            contactInfoResult = ContactInfo.Create(
                contactInfoInput.FullName?? "",
                contactInfoInput.Email?? "",
                contactInfoInput.PhoneNumber,
                contactInfoInput.PhoneRegionCode,
                contactInfoInput.PreferredContactMethod
            );
        }
        else
        {
            PhoneNumber phoneNumber;
            if (customer.Phone == null)
            {
                var phoneNumberResult = PhoneNumber.Create(contactInfoInput.PhoneNumber, contactInfoInput.PhoneRegionCode);
                if(phoneNumberResult.IsFailure)
                    return phoneNumberResult.Error;
                phoneNumber = phoneNumberResult.Value;
            }else{
                phoneNumber = customer.Phone;
            }

            contactInfoResult = ContactInfo.Create(customer.Name.DisplayName, customer.Email, phoneNumber, contactInfoInput.PreferredContactMethod);
        }

        return contactInfoResult;
    }

    private OperationResult<DeviceInfo> CreateDeviceInfo(DeviceInfoInput deviceInfoInput)
    {
        return DeviceInfo.Create(deviceInfoInput.DeviceType, deviceInfoInput.Manufacturer,
            deviceInfoInput.Model, deviceInfoInput.SerialNumber);
    }
    
    private OperationResult<FaultInfo> CreateFaultInfo(FaultInfoInput faultInfoInput)
    {
        return FaultInfo.Create(faultInfoInput.WhenOccurred, faultInfoInput.HowToReproduce,
            faultInfoInput.Description, faultInfoInput.PreviouslyRepaired);
    }
    
    private OperationResult<ReturnInfo> CreateReturnInfo(ReturnInfoInput returnInfoInput)
    {
        Address? address = null;
        if (returnInfoInput.Address != null)
        {
            var addressResult = Address.Create(new AddressData
            {
                RecipientName = returnInfoInput.Address.RecipientName,
                Street = returnInfoInput.Address.Street,
                BuildingNumber = returnInfoInput.Address.BuildingNumber,
                ApartmentNumber = returnInfoInput.Address.ApartmentNumber,
                PostalCode = returnInfoInput.Address.PostalCode,
                City = returnInfoInput.Address.City,
                Country = returnInfoInput.Address.Country,
            });
            
            if(addressResult.IsFailure)
                return addressResult.Error;
            address = addressResult.Value;
        }

        return ReturnInfo.Create(returnInfoInput.ReturnMethod, address);
    }
}