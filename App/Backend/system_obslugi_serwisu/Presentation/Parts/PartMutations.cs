using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Parts.Add;
using system_obslugi_serwisu.Application.Parts.AddCategory;
using system_obslugi_serwisu.Application.Parts.AdjustStock;
using system_obslugi_serwisu.Application.Parts.FlagForReorder;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.Parts.Add;

namespace system_obslugi_serwisu.Presentation.Parts;

[ExtendObjectType(typeof(Mutation))]
public class PartMutations
{
    [Authorize]
    [SetTenantMiddleware]
    public async Task<bool> AddPartCategory([Service] IMediator mediatr, string name)
    {
        var addPartCategoryResult = await mediatr.Send(new AddPartCategoryCommand{
            Name = name
        });

        if(addPartCategoryResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(addPartCategoryResult.Error.GetUserMessage())
                .SetCode(addPartCategoryResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    [SetTenantMiddleware]
    public async Task<bool> AddPart([Service] IMediator mediatr, AddPartRequest request)
    {
        var addPartResult = await mediatr.Send(new AddPartCommand{
            Name = request.Name,
            ManufacturerCode = request.ManufacturerCode,
            PartCategoryId = request.PartCategoryId,
            InitialStock = request.InitialStock,
            LowStockThreshold = request.LowStockThreshold
        });

        if(addPartResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(addPartResult.Error.GetUserMessage())
                .SetCode(addPartResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    [SetTenantMiddleware]
    public async Task<bool> ChangeReorderFlag([Service] IMediator mediatr, Guid partId)
    {
        var changeFlagResult = await mediatr.Send(new ChangeReorderFlagCommand{
            PartId = partId
        });

        if(changeFlagResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(changeFlagResult.Error.GetUserMessage())
                .SetCode(changeFlagResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    [SetTenantMiddleware]
    public async Task<bool> AdjustStock([Service] IMediator mediatr, Guid partId, int newStock)
    {
        var adjustStockResult = await mediatr.Send(new AdjustStockCommand{
            PartId = partId,
            NewStock = newStock
        });

        if(adjustStockResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(adjustStockResult.Error.GetUserMessage())
                .SetCode(adjustStockResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
}