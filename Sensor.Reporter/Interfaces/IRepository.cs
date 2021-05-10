using SensorReporter.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SensorReporter.Repositories
{
    public interface IRepository<T> where T: class
    {
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> predicate = null);
        Task Add(T entity);
    }
}
