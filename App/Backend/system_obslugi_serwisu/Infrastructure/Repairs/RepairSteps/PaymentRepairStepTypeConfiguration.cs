using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Infrastructure.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs.RepairSteps;

public class PaymentRepairStepTypeConfiguration : IEntityTypeConfiguration<PaymentRepairStep>
{
    public void Configure(EntityTypeBuilder<PaymentRepairStep> builder)
    {
        builder.OwnsMoney(repairStep => repairStep.Amount, "Amount");
        builder.Property(repairStep => repairStep.Paid);
    }
}