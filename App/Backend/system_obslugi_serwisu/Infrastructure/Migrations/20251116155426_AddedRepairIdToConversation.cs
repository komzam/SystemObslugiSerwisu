using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedRepairIdToConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RepairId",
                table: "Conversations",
                type: "uuid",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RepairId",
                table: "Conversations");
        }
    }
}
