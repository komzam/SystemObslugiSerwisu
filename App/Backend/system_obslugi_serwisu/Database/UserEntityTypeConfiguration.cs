using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Types;

namespace system_obslugi_serwisu.Database;

public class UserEntityTypeConfiguration /*: IEntityTypeConfiguration<User>*/
{
    /*public void Configure(EntityTypeBuilder<User> userConfiguration)
    {
        userConfiguration.Property(user => user.Email)
            .HasConversion(
                email => email.Value,
                email => Email.Create(email).Value);
        
        userConfiguration.Property(user => user.Username)
            .HasConversion(
                username => username.Value,
                username => Username.Create(username).Value);
    }*/
}