using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixedTypoInFaultInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FaultInfo_WhenOccured",
                table: "Repairs",
                newName: "FaultInfo_WhenOccurred");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FaultInfo_WhenOccurred",
                table: "Repairs",
                newName: "FaultInfo_WhenOccured");
        }
    }
}
