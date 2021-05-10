using Microsoft.Extensions.Configuration;
using SensorReporter.Infra.Data;
using SensorReporter.Interfaces;
using SensorReporter.Models;
using SensorReporter.Repositories;
using System;
using System.Threading.Tasks;

namespace SensorReporter
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private SensorReporterContext _context = null;
        private Repository<Event> eventRepository = null;

        public UnitOfWork(IConfiguration configuration)
        {
            _context = new SensorReporterContext(configuration);
        }

        public IRepository<Event> EventRepository
        {
            get
            {
                if (eventRepository == null)
                {
                    eventRepository = new Repository<Event>(_context);
                }

                return eventRepository;
            }
        }

        private bool disposed = false;

        public async Task Commit()
        {
            await _context.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
