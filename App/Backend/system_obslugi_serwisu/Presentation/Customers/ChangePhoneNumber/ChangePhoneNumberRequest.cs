namespace system_obslugi_serwisu.Presentation.Customers.ChangePhoneNumber;

public class ChangePhoneNumberRequest
{
    public required string NewPhoneNumber { get; set; }
    public required string RegionCode { get; set; }
}