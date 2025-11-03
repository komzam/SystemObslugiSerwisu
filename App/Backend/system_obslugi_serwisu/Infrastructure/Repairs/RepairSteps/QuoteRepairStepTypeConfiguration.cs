using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Infrastructure.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs.RepairSteps;

public class QuoteRepairStepTypeConfiguration : IEntityTypeConfiguration<QuoteRepairStep>
{
    public void Configure(EntityTypeBuilder<QuoteRepairStep> builder)
    {
        builder.OwnsMoney(repairStep => repairStep.LaborCost, "LaborCost");
        builder.OwnsMoney(repairStep => repairStep.PartsCost, "PartsCost");
        builder.Property(repairStep => repairStep.QuoteAccepted);
    }
}