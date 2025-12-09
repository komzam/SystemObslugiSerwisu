using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Parts.Add;
using system_obslugi_serwisu.Application.Parts.AddCategory;
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
}