using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RepairImplementationAndSomeFixes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone_Value",
                table: "RepairShops",
                newName: "Phone_Number");

            migrationBuilder.AddColumn<string>(
                name: "Phone_RegionCode",
                table: "RepairShops",
                type: "character varying(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone_Number",
                table: "Customers",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone_RegionCode",
                table: "Customers",
                type: "character varying(2)",
                maxLength: 2,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Repairs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RepairShopId = table.Column<Guid>(type: "uuid", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ContactInfo_FullName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ContactInfo_Email_Value = table.Column<string>(type: "text", nullable: false),
                    ContactInfo_PhoneNumber_Number = table.Column<string>(type: "text", nullable: false),
                    ContactInfo_PhoneNumber_RegionCode = table.Column<string>(type: "text", nullable: false),
                    ContactInfo_PreferredContactMethod = table.Column<int>(type: "integer", nullable: false),
                    DeviceInfo_DeviceType = table.Column<int>(type: "integer", nullable: false),
                    DeviceInfo_Manufacturer = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    DeviceInfo_Model = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    DeviceInfo_SerialNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FaultInfo_WhenOccured = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    FaultInfo_HowToReproduce = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    FaultInfo_Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    FaultInfo_PreviouslyRepaired = table.Column<bool>(type: "boolean", nullable: false),
                    ReturnInfo_ReturnMethod = table.Column<int>(type: "integer", nullable: false),
                    ReturnInfo_ReturnAddress_RecipientName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ReturnInfo_ReturnAddress_Street = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ReturnInfo_ReturnAddress_BuildingNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    ReturnInfo_ReturnAddress_ApartmentNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    ReturnInfo_ReturnAddress_PostalCode_Value = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    ReturnInfo_ReturnAddress_City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ReturnInfo_ReturnAddress_Country = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Repairs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Repairs_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Repairs_RepairShops_RepairShopId",
                        column: x => x.RepairShopId,
                        principalTable: "RepairShops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Repairs_CustomerId",
                table: "Repairs",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Repairs_RepairShopId",
                table: "Repairs",
                column: "RepairShopId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Repairs");

            migrationBuilder.DropColumn(
                name: "Phone_RegionCode",
                table: "RepairShops");

            migrationBuilder.DropColumn(
                name: "Phone_Number",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Phone_RegionCode",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "Phone_Number",
                table: "RepairShops",
                newName: "Phone_Value");
        }
    }
}
