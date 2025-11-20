using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace system_obslugi_serwisu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RepairImages",
                columns: table => new
                {
                    ImageId = table.Column<Guid>(type: "uuid", nullable: false),
                    RepairId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepairImages", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_RepairImages_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RepairImages_Repairs_RepairId",
                        column: x => x.RepairId,
                        principalTable: "Repairs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RepairShopImages",
                columns: table => new
                {
                    ImageId = table.Column<Guid>(type: "uuid", nullable: false),
                    RepairShopId = table.Column<Guid>(type: "uuid", nullable: false),
                    ImageType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepairShopImages", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_RepairShopImages_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RepairShopImages_RepairShops_RepairShopId",
                        column: x => x.RepairShopId,
                        principalTable: "RepairShops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RepairImages_RepairId",
                table: "RepairImages",
                column: "RepairId");

            migrationBuilder.CreateIndex(
                name: "IX_RepairShopImages_RepairShopId",
                table: "RepairShopImages",
                column: "RepairShopId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RepairImages");

            migrationBuilder.DropTable(
                name: "RepairShopImages");

            migrationBuilder.DropTable(
                name: "Images");
        }
    }
}
