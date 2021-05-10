using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SensorReporter.Models;

namespace SensorReporter.Infra.Data
{
    public class SensorReporterContext : DbContext
    {
        public IConfiguration Configuration { get; }

        public SensorReporterContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public virtual DbSet<Event> Events { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(Configuration.GetValue<string>("CONNECTION_STRING"));
    }
}
