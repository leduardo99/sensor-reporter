using SensorReporter.Models;
using SensorReporter.Repositories;
using System.Threading.Tasks;

namespace SensorReporter.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<Event> EventRepository { get; }

        Task Commit();
    }
}
