using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Logging.Debug;
using Microsoft.Extensions.Hosting;
using SensorReporter.Infra.Data;
using SensorReporter.Interfaces;
using SensorReporter.Hubs;
using SensorReporter.HostedServices;
using SensorReporter.Kafka;

namespace SensorReporter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(builder =>
            {
                builder.AddConsole()
                    .AddDebug()
                    .AddFilter<ConsoleLoggerProvider>(category: null, level: LogLevel.Debug)
                    .AddFilter<DebugLoggerProvider>(category: null, level: LogLevel.Debug);
            });

            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins(Configuration.GetValue<string>("CLIENT_URL"))
                        .AllowCredentials();
                });
            });

            services.AddDbContext<SensorReporterContext>();

            services.AddSingleton<IUnitOfWork, UnitOfWork>();

            services.AddSingleton<KafkaClientHandle>();
            services.AddSingleton<KafkaDependentProducer<string, string>>();
            services.AddHostedService<KafkaService>();

            services.AddSignalR();

            services.AddControllers();
            services.AddSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseRouting();
            app.UseCors("ClientPermission");

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sensor Reporter API");
            });

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();

                endpoints.MapHub<SensorHub>("/sensorsHub");
            });
        }
    }
}
