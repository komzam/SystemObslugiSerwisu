using Amazon.S3;
using HotChocolate.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using RabbitMQ.Client;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Application.ImageQueue;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Infrastructure.Identity;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Infrastructure.ImageProcessing;
using system_obslugi_serwisu.Infrastructure.Images;
using system_obslugi_serwisu.Infrastructure.Migrations;
using system_obslugi_serwisu.Infrastructure.Queue;
using system_obslugi_serwisu.Infrastructure.Repairs;
using system_obslugi_serwisu.Infrastructure.RepairShopMigrations;
using system_obslugi_serwisu.Infrastructure.RepairShops;
using system_obslugi_serwisu.Infrastructure.S3;
using system_obslugi_serwisu.Presentation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContextPool<DatabaseContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DatabaseContext")));

builder.Services.AddScoped<RepairShopContextFactory>(_ =>
    new RepairShopContextFactory(builder.Configuration.GetConnectionString("DatabaseContext")));


builder.Services.Configure<S3Buckets>(builder.Configuration.GetSection("S3Buckets"));
builder.Services.AddSingleton<S3Clients>(_ =>
{
    var publicConfig = new AmazonS3Config
    {
        ServiceURL = builder.Configuration["S3Config:PublicUrl"],
        ForcePathStyle = true,
        UseHttp = true
    };
    
    var internalConfig = new AmazonS3Config
    {
        ServiceURL = builder.Configuration["S3Config:InternalUrl"],
        ForcePathStyle = true,
        UseHttp = true
    };

    return new S3Clients
    {
        PublicClient = new AmazonS3Client(
            builder.Configuration["S3Config:User"],
            builder.Configuration["S3Config:Password"],
            publicConfig
        ),
        InternalClient = new AmazonS3Client(
            builder.Configuration["S3Config:User"],
            builder.Configuration["S3Config:Password"],
            internalConfig)
    };
});

builder.Services.AddSingleton<IConnectionFactory>(_ =>
    new ConnectionFactory
    {
        HostName = builder.Configuration["RabbitMq:Host"] ?? string.Empty,
        UserName = builder.Configuration["RabbitMq:User"] ?? string.Empty,
        Password = builder.Configuration["RabbitMq:Password"] ?? string.Empty,
    }
);

builder.Services.AddAuthorization();
builder.Services.AddIdentity<User, ApplicationRole>()
    .AddEntityFrameworkStores<DatabaseContext>()
    .AddApiEndpoints();

GraphQlConfig.Apply(builder);

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<Program>();
    cfg.LicenseKey = Environment.GetEnvironmentVariable("MEDIATR_LICENSE_KEY");
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IRepairShopStorageService, RepairShopStorageService>();
builder.Services.AddScoped<IRepairStorageService, RepairStorageService>();
builder.Services.AddSingleton<QueueConnectionProvider>();
builder.Services.AddSingleton<IImageQueue, ImageQueue>();
builder.Services.AddScoped<IIdentityController, IdentityController>();
builder.Services.AddHostedService<ImageProcessingWorker>();
builder.Services.AddHostedService<DbImageAddingWorker>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000", "http://repairshop.localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    MigrationRunner.ApplyMigrations(app);
    await RepairShopMigrationRunner.ApplyMigrations(app);
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseWebSockets();
app.MapGraphQL()
    .WithOptions(
        new GraphQLServerOptions
        {
            Tool =
            {
                Enable = false
            }
        });
app.MapNitroApp("/nitroApp", "/graphql");
app.UseCors("AllowFrontend");

app.Run();