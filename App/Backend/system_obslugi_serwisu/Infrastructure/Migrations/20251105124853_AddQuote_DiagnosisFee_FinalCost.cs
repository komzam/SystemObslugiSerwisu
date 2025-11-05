using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuote_DiagnosisFee_FinalCost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuoteAccepted",
                table: "RepairStep",
                newName: "Quote_QuoteAccepted");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Quote_CreatedAt",
                table: "RepairStep",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DiagnosisFee_Currency",
                table: "RepairShops",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DiagnosisFee_Value",
                table: "RepairShops",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DiagnosisFee_Currency",
                table: "Repairs",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DiagnosisFee_Value",
                table: "Repairs",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FinalCost_Currency",
                table: "Repairs",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "FinalCost_Value",
                table: "Repairs",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LaborCost_Currency",
                table: "Repairs",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LaborCost_Value",
                table: "Repairs",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PartsCost_Currency",
                table: "Repairs",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PartsCost_Value",
                table: "Repairs",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Quote_CreatedAt",
                table: "Repairs",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Quote_QuoteAccepted",
                table: "Repairs",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quote_CreatedAt",
                table: "RepairStep");

            migrationBuilder.DropColumn(
                name: "DiagnosisFee_Currency",
                table: "RepairShops");

            migrationBuilder.DropColumn(
                name: "DiagnosisFee_Value",
                table: "RepairShops");

            migrationBuilder.DropColumn(
                name: "DiagnosisFee_Currency",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "DiagnosisFee_Value",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "FinalCost_Currency",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "FinalCost_Value",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "LaborCost_Currency",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "LaborCost_Value",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "PartsCost_Currency",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "PartsCost_Value",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "Quote_CreatedAt",
                table: "Repairs");

            migrationBuilder.DropColumn(
                name: "Quote_QuoteAccepted",
                table: "Repairs");

            migrationBuilder.RenameColumn(
                name: "Quote_QuoteAccepted",
                table: "RepairStep",
                newName: "QuoteAccepted");
        }
    }
}
