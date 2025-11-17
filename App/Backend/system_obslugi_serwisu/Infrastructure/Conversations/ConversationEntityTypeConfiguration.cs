using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;

namespace system_obslugi_serwisu.Infrastructure.Conversations;

public class ConversationEntityTypeConfiguration : IEntityTypeConfiguration<Conversation>
{
    public void Configure(EntityTypeBuilder<Conversation> conversationConfiguration)
    {
        conversationConfiguration.HasKey(conversation => conversation.Id);
        conversationConfiguration.Property(conversation => conversation.Id)
            .HasConversion(
                id => id.Value,
                value => new ConversationId(value))
            .ValueGeneratedNever();
        
        conversationConfiguration.Property(conversation => conversation.RepairShopId)
            .HasConversion(
                id => id.Value,
                value => new RepairShopId(value))
            .ValueGeneratedNever();
        
        conversationConfiguration.Property(conversation => conversation.CustomerId)
            .HasConversion(
                id => id.Value,
                value => new CustomerId(value))
            .ValueGeneratedNever();
        
        conversationConfiguration.Property(conversation => conversation.RepairId)
            .HasConversion(
                id => id == null ? (Guid?)null : id.Value,
                value => value == null ? null : new RepairId(value.Value));

        conversationConfiguration.Property(conversation => conversation.LastModifiedAt);
        conversationConfiguration.Property(conversation => conversation.CreatedAt);
        conversationConfiguration.HasMany(conversation => conversation.Messages);
    }
}