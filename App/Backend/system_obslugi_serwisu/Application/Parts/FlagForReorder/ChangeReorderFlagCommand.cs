using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.FlagForReorder;

public class ChangeReorderFlagCommand : IRequest<OperationResult>
{
    public required Guid PartId { get; set; }
}