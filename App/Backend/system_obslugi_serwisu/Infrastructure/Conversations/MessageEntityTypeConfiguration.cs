using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Users;

namespace system_obslugi_serwisu.Infrastructure.Conversations;

public class MessageEntityTypeConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> messageConfiguration)
    {
        messageConfiguration.HasKey(message => message.Id);
        messageConfiguration.Property(message => message.Id)
            .HasConversion(
                id => id.Value,
                value => new MessageId(value))
            .ValueGeneratedNever();
        
        messageConfiguration.Property(message => message.ConversationId)
            .HasConversion(
                id => id.Value,
                value => new ConversationId(value))
            .ValueGeneratedNever();
        
        messageConfiguration.Property(message => message.SenderId)
            .HasConversion(
                id => id.Value,
                value => new UserId(value))
            .ValueGeneratedNever();

        messageConfiguration.Property(message => message.SenderRole);
        messageConfiguration.Property(message => message.Content).HasMaxLength(Message.ContentMaxLength);
        messageConfiguration.Property(message => message.CreatedAt);
    }
}