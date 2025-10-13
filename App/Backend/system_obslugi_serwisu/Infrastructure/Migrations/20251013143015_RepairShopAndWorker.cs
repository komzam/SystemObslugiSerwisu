using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RepairShopAndWorker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RepairShops",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email_Value = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Phone_Value = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Address_RecipientName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Address_Street = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Address_BuildingNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Address_ApartmentNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Address_PostalCode_Value = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Address_City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Address_Country = table.Column<int>(type: "integer", nullable: false),
                    OpeningHours_Monday_From = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Monday_To = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Tuesday_From = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Tuesday_To = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Wednesday_From = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Wednesday_To = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Thursday_From = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Thursday_To = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Friday_From = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Friday_To = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Saturday_From = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Saturday_To = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Sunday_From = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    OpeningHours_Sunday_To = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepairShops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    RepairShopId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workers_RepairShops_RepairShopId",
                        column: x => x.RepairShopId,
                        principalTable: "RepairShops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Workers_RepairShopId",
                table: "Workers",
                column: "RepairShopId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Workers");

            migrationBuilder.DropTable(
                name: "RepairShops");
        }
    }
}
