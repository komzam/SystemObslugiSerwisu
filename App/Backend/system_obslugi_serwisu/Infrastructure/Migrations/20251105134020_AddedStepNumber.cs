using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedStepNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StepNumber",
                table: "RepairStep",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StepNumber",
                table: "RepairStep");
        }
    }
}
