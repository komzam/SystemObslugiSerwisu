using Microsoft.AspNetCore.Components.RenderTree;
using ZXing;
using ZXing.Common;
using ZXing.Rendering;

namespace system_obslugi_serwisu.Infrastructure.Shared;

public static class BarcodeGenerator
{
    public static string GenerateBarcode(string inputText)
    {
        IBarcodeRenderer<SvgRenderer.SvgImage> renderer = new SvgRenderer();
        
        var writer = new BarcodeWriter<SvgRenderer.SvgImage>
        {
            Format = BarcodeFormat.CODE_128,
            Options = new EncodingOptions
            {
                Height = 90, 
                Width = 420,
                Margin = 0,
                PureBarcode = true
            },
            Renderer = renderer
        };
        var result = writer.Write(inputText);
        return result!=null ? result.Content : "";
    }
}