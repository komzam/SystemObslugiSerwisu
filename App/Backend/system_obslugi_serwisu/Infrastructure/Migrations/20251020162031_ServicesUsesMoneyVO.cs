using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ServicesUsesMoneyVO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Currency",
                table: "Services",
                newName: "Price_Currency");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Services",
                newName: "Price_Value");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price_Currency",
                table: "Services",
                newName: "Currency");

            migrationBuilder.RenameColumn(
                name: "Price_Value",
                table: "Services",
                newName: "Price");
        }
    }
}
