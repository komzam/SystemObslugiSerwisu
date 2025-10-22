namespace system_obslugi_serwisu.Domain.Repairs;

public enum DeviceType
{
    // Personal computing
    Smartphone,
    Tablet,
    Laptop,
    Desktop,

    // Wearables
    Smartwatch,
    Wearable,

    // Entertainment
    GamingConsole,
    Television,
    Monitor,
    Speaker,
    Headphones,

    // Imaging & drones
    Camera,
    Drone,

    // Network & smart devices
    NetworkDevice,
    SmartHomeDevice,

    // Peripherals
    Printer,
    Scanner,

    Other = 99
}