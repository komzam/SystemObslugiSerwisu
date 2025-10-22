using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public class DeviceInfo : ValueObject
{
    public const int ManufacturerMaxLength = 50;
    public const int ModelMaxLength = 50;
    public const int SerialNumberMaxLength = 50;
    
    public DeviceType DeviceType { get; private set; }
    public string Manufacturer { get; private set; }
    public string Model { get; private set; }
    public string SerialNumber { get; private set; }

    private DeviceInfo() { }

    private DeviceInfo(DeviceType deviceType, string manufacturer, string model, string serialNumber)
    {
        DeviceType = deviceType;
        Manufacturer = manufacturer;
        Model = model;
        SerialNumber = serialNumber;
    }

    private static OperationResult ValidateInput(string manufacturer, string model,
        string serialNumber)
    {
        if (string.IsNullOrWhiteSpace(manufacturer))
            return DeviceInfoErrors.InvalidManufacturer();
        
        if (manufacturer.Length > ManufacturerMaxLength)
            return DeviceInfoErrors.ManufacturerTooLong();
        
        if (string.IsNullOrWhiteSpace(model))
            return DeviceInfoErrors.InvalidModel();
        
        if (model.Length > ModelMaxLength)
            return DeviceInfoErrors.ModelTooLong();
        
        if (string.IsNullOrWhiteSpace(serialNumber))
            return DeviceInfoErrors.InvalidSerialNumber();
        
        if (serialNumber.Length > SerialNumberMaxLength)
            return DeviceInfoErrors.SerialNumberTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<DeviceInfo> Create(DeviceType deviceType, string manufacturer, string model,
        string serialNumber)
    {
        manufacturer = manufacturer.Trim();
        model = model.Trim();
        serialNumber = serialNumber.Trim();
        
        var validationResult = ValidateInput(manufacturer, model, serialNumber);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new DeviceInfo(deviceType, manufacturer, model, serialNumber);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return DeviceType;
        yield return Manufacturer;
        yield return Model;
        yield return SerialNumber;
    }
}