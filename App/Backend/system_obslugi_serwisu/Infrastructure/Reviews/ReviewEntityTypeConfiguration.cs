using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;

namespace system_obslugi_serwisu.Infrastructure.Reviews;

public class ReviewEntityTypeConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> reviewConfiguration)
    {
        reviewConfiguration.HasKey(review => review.Id);
        reviewConfiguration.Property(review => review.Id)
            .HasConversion(
                id => id.Value,
                value => new ReviewId(value))
            .ValueGeneratedNever();
        
        reviewConfiguration.Property(review => review.RepairShopId)
            .HasConversion(
                id => id.Value,
                value => new RepairShopId(value));
        
        reviewConfiguration.Property(review => review.AuthorId)
            .HasConversion(
                id => id.Value,
                value => new CustomerId(value));
        
        reviewConfiguration.Property(review => review.Rating);

        reviewConfiguration.Property(review => review.Comment).HasMaxLength(Review.CommentMaxLength);
    }
}