using Microsoft.EntityFrameworkCore;
using SensorReporter.Infra.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SensorReporter.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private SensorReporterContext _context = null;
        private readonly DbSet<T> _dbSet;

        public Repository(SensorReporterContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task Add(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> predicate = null)
        {
            if (predicate != null)
            {
                return await _dbSet.Where(predicate).ToListAsync();
            }

            return await _dbSet.ToListAsync();
        }
    }
}
