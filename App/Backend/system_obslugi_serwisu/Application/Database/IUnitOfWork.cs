using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Database;

public interface IUnitOfWork
{
    public ICustomerRepository CustomerRepository { get; }
    public OperationResult SaveChanges();
}