using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Infrastructure.Customers;
using system_obslugi_serwisu.Infrastructure.Identity;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Infrastructure.Migrations;
using system_obslugi_serwisu.Presentation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContextPool<DatabaseContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DatabaseContext")));

builder.Services.AddAuthorization();
builder.Services.AddIdentity<User, ApplicationRole>()
    .AddEntityFrameworkStores<DatabaseContext>()
    .AddApiEndpoints();

builder.Services.AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<Program>();
    cfg.LicenseKey = Environment.GetEnvironmentVariable("MEDIATR_LICENSE_KEY");
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IIdentityController, IdentityController>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    MigrationRunner.ApplyMigrations(app);
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL();
app.MapIdentityApi<User>();

app.Run();