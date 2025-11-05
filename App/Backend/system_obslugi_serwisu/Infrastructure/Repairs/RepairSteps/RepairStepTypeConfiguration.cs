using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;

namespace system_obslugi_serwisu.Infrastructure.Repairs.RepairSteps;

public class RepairStepTypeConfiguration : IEntityTypeConfiguration<RepairStep>
{
    public void Configure(EntityTypeBuilder<RepairStep> builder)
    {
        builder.HasKey(repairStep => repairStep.Id);
        builder.Property(repairStep => repairStep.Id).ValueGeneratedNever();
        
        builder.HasDiscriminator<string>("StepType")
            .HasValue<NormalRepairStep>("Normal")
            .HasValue<PaymentRepairStep>("Payment")
            .HasValue<QuoteRepairStep>("Quote");

        builder.HasOne(repairStep => repairStep.Repair)
            .WithMany(repair => repair.RepairHistory);
        
        builder.Property(repairStep => repairStep.Description).HasMaxLength(RepairStep.DescriptionMaxLength);

        builder.Property(repairStep => repairStep.Status);

        builder.Property(repairStep => repairStep.StepNumber);

        builder.Property(repairStep => repairStep.CreatedAt);
    }
}