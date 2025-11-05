using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops.Errors;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Domain.Reviews.Errors;
using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Domain.Services.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairShops;

public record RepairShopData {
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string PhoneRegionCode { get; set; }
    public required string Phone { get; set; }
    public required Address Address { get; set; }
}

public class RepairShop
{
    public const int NameMaxLength = 100;
    public const int AboutUsMaxLength = 500;


    public Guid Id;
    public string Name { get; private set; }
    public Email Email { get; private set; }
    public PhoneNumber Phone { get; private set; }
    public Address Address { get; private set; }
    public string TimeZoneId { get; private set; }
    public double Rating { get; private set; }
    public int ReviewCount { get; private set; }
    public string? AboutUs { get; private set; }
    public Money? DiagnosisFee { get; private set; }
    public OpeningHours OpeningHours { get; private set; }
    public List<Worker>? Workers { get; private set; }
    public List<Repair> Repairs { get; private set; } = new List<Repair>();
    public IReadOnlyList<Review> Reviews => _reviews.AsReadOnly();
    public IReadOnlyList<Service> Services => _services.AsReadOnly();
    public DateTimeOffset CreatedAt { get; private set; }

    private List<Review> _reviews = new();
    private List<Service> _services = new();

    private RepairShop() { }

    private RepairShop(string name, Email email, PhoneNumber phoneNumber, Address address, string timeZoneId)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email;
        Phone = phoneNumber;
        Address = address;
        TimeZoneId = timeZoneId;
        OpeningHours = new OpeningHours();
    }

    private static RepairShopData TrimData(RepairShopData data)
    {
        return data with
        {
            Name = data.Name.Trim(),
        };
    }

    private static OperationResult ValidateData(RepairShopData data)
    {
        if (string.IsNullOrWhiteSpace(data.Name))
            return RepairShopErrors.InvalidName();

        if (data.Name.Length > NameMaxLength)
            return RepairShopErrors.NameTooLong();

        return OperationResult.Success();
    }

    public static OperationResult<RepairShop> Create(RepairShopData data)
    {
        data = TrimData(data);

        var validationResult = ValidateData(data);
        if (validationResult.IsFailure)
            return validationResult.Error;

        var emailResult = Email.Create(data.Email);
        if (emailResult.IsFailure)
            return emailResult.Error;

        var phoneResult = PhoneNumber.Create(data.Phone, data.PhoneRegionCode);
        if (phoneResult.IsFailure)
            return phoneResult.Error;
        
        var timeZoneId = TimeZoneHelper.IanaIdFromCountry(data.Address.Country);
        
        return new RepairShop(data.Name, emailResult.Value, phoneResult.Value, data.Address, timeZoneId);
    }

    private void UpdateReviewStatistics()
    {
        ReviewCount = _reviews.Count;
        Rating = ReviewCount > 0 ? Math.Round(_reviews.Average(r => r.Rating), 1) : 0;
    }

    public OperationResult AddReview(Customer author, int rating, string? comment)
    {
        var reviewResult = Review.Create(this, author, rating, comment);
        if(reviewResult.IsFailure)
            return reviewResult.Error;
        
        _reviews.Add(reviewResult.Value);
        UpdateReviewStatistics();
        
        return OperationResult.Success();
    }

    public OperationResult RemoveReview(Guid reviewId, Customer requester)
    {
        Review? review = _reviews.Find(r => r.Id == reviewId);

        if (review == null)
            return ReviewErrors.ReviewNotFound();

        if (review.Author.Id != requester.Id)
            return ReviewErrors.ReviewAccessDenied();
        
        if(_reviews.Remove(review))
            UpdateReviewStatistics();
        
        return OperationResult.Success();
    }
    
    public OperationResult AddService(string name, decimal price, CurrencyCode currencyCode)
    {
        var serviceResult = Service.Create(this, name, price, currencyCode);
        if(serviceResult.IsFailure)
            return serviceResult.Error;
        
        _services.Add(serviceResult.Value);
        
        return OperationResult.Success();
    }

    public OperationResult RemoveService(Guid serviceId)
    {
        Service? service = _services.Find(s => s.Id == serviceId);

        if (service == null)
            return ServiceErrors.ServiceNotFound();

        _services.Remove(service);
        
        return OperationResult.Success();
    }
}