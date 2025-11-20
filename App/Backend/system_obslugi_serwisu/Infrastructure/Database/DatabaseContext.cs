using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Infrastructure.Identity;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Infrastructure.Conversations;
using system_obslugi_serwisu.Infrastructure.Customers;
using system_obslugi_serwisu.Infrastructure.Images;
using system_obslugi_serwisu.Infrastructure.Repairs;
using system_obslugi_serwisu.Infrastructure.Repairs.RepairSteps;
using system_obslugi_serwisu.Infrastructure.RepairShops;
using system_obslugi_serwisu.Infrastructure.Reviews;
using system_obslugi_serwisu.Infrastructure.Services;
using system_obslugi_serwisu.Infrastructure.Shared;
using system_obslugi_serwisu.Infrastructure.Workers;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : IdentityDbContext<User, ApplicationRole, string>(options)
{
    public DbSet<Customer> Customers {get; set;}
    public DbSet<Worker> Workers {get; set;}
    public DbSet<Repair> Repairs {get; set;}
    public DbSet<Conversation> Conversations {get; set;}
    public DbSet<Message> Messages {get; set;}
    public DbSet<RepairShop> RepairShops {get; set;}
    public DbSet<Service> Services {get; set;}
    public DbSet<Review> Reviews {get; set;}
    public DbSet<Image> Images {get; set;}
    public DbSet<RepairImage> RepairImages {get; set;}
    public DbSet<RepairShopImage> RepairShopImages {get; set;}
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        new CustomerEntityTypeConfiguration().Configure(builder.Entity<Customer>());
        
        new WorkerEntityTypeConfiguration().Configure(builder.Entity<Worker>());
        
        new RepairShopEntityTypeConfiguration().Configure(builder.Entity<RepairShop>());
        new ServiceEntityTypeConfiguration().Configure(builder.Entity<Service>());
        new ReviewEntityTypeConfiguration().Configure(builder.Entity<Review>());
        
        new RepairEntityTypeConfiguration().Configure(builder.Entity<Repair>());
        new RepairStepTypeConfiguration().Configure(builder.Entity<RepairStep>());
        new PaymentRepairStepTypeConfiguration().Configure(builder.Entity<PaymentRepairStep>());
        new QuoteRepairStepTypeConfiguration().Configure(builder.Entity<QuoteRepairStep>());
        new ConversationEntityTypeConfiguration().Configure(builder.Entity<Conversation>());
        new MessageEntityTypeConfiguration().Configure(builder.Entity<Message>());
        new ImageEntityTypeConfiguration().Configure(builder.Entity<Image>());
        new RepairImageEntityTypeConfiguration().Configure(builder.Entity<RepairImage>());
        new RepairShopImageEntityTypeConfiguration().Configure(builder.Entity<RepairShopImage>());
    }
}