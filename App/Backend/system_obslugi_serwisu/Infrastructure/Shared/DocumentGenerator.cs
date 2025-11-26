using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Infrastructure.Shared;

public static class DocumentGenerator
{
    public static Stream GenerateRepairDocument(TicketNumber ticketNumber)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(12).FontFamily("Arial"));

                page.Header()
                    .Text("System Obsługi Serwisu")
                    .AlignCenter()
                    .SemiBold().FontSize(24).FontColor(Colors.Blue.Medium);
                
                page.Content()
                    .PaddingVertical(1, Unit.Centimetre)
                    .Column(x =>
                    {
                        x.Spacing(0.25f, Unit.Centimetre);
                        
                        x.Item()
                            .AlignCenter()
                            .Height(1.5f, Unit.Centimetre)
                            .Width(7, Unit.Centimetre)
                            .Svg(BarcodeGenerator.GenerateBarcode(ticketNumber.Value));
                        
                        x.Item().AlignCenter().Text(ticketNumber.Value).FontSize(10);
                    });
            });
        });

        var pdf = new MemoryStream();
        document.GeneratePdf(pdf);
        pdf.Position = 0;
        return pdf;
    }
}