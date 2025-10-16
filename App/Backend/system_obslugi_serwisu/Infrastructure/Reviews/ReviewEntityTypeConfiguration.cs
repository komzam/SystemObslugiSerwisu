using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Reviews;

namespace system_obslugi_serwisu.Infrastructure.Reviews;

public class ReviewEntityTypeConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> reviewConfiguration)
    {
        reviewConfiguration.HasKey(review => review.Id);

        reviewConfiguration.HasOne(review => review.RepairShop);
        
        reviewConfiguration.HasOne(review => review.Author);
        
        reviewConfiguration.Property(review => review.Rating);

        reviewConfiguration.Property(review => review.Comment).HasMaxLength(Review.CommentMaxLength);
    }
}