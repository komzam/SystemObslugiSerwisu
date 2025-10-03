using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using system_obslugi_serwisu.Database;
using system_obslugi_serwisu.Extensions;
using system_obslugi_serwisu.Identity;
using system_obslugi_serwisu.Types;

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
    .AddQueryType<Query>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    MigrationExtension.ApplyMigrations(app);
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL();
app.MapIdentityApi<User>();

app.Run();