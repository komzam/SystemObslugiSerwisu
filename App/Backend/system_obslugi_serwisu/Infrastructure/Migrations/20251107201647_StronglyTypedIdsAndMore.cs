using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StronglyTypedIdsAndMore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Customers_AuthorId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Workers_RepairShops_RepairShopId",
                table: "Workers");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_AuthorId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Workers");

            migrationBuilder.AlterColumn<Guid>(
                name: "RepairShopId",
                table: "Workers",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Workers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Workers",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Workers_RepairShops_RepairShopId",
                table: "Workers",
                column: "RepairShopId",
                principalTable: "RepairShops",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workers_RepairShops_RepairShopId",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Workers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Workers");

            migrationBuilder.AlterColumn<Guid>(
                name: "RepairShopId",
                table: "Workers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Workers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AuthorId",
                table: "Reviews",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Customers_AuthorId",
                table: "Reviews",
                column: "AuthorId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Workers_RepairShops_RepairShopId",
                table: "Workers",
                column: "RepairShopId",
                principalTable: "RepairShops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
