using System;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SensorReporter.Hubs;
using SensorReporter.Interfaces;
using SensorReporter.Kafka;
using SensorReporter.Models;

namespace SensorReporter.HostedServices
{
    public class KafkaService : BackgroundService
    {
        private readonly string _topic;
        private readonly IConsumer<string, string> _kafkaConsumer;
        private readonly ILogger _logger;
        private readonly KafkaDependentProducer<string, string> _producer;
        private readonly IUnitOfWork _uow;
        private readonly IHubContext<SensorHub> _sensorHub;

        public KafkaService(KafkaDependentProducer<string, string> producer, IConfiguration config, ILogger<KafkaService> logger, IUnitOfWork uow, IHubContext<SensorHub> sensorHub)
        {
            var consumerConfig = new ConsumerConfig()
            {
                BootstrapServers = config.GetValue<string>("KAFKA_BROKER"),
                GroupId = config.GetValue<string>("KAFKA_CLIENT_ID"),
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            _topic = config.GetValue<string>("KAFKA_TOPIC");
            _kafkaConsumer = new ConsumerBuilder<string, string>(consumerConfig).Build();
            _logger = logger;
            _producer = producer;
            _uow = uow;
            _sensorHub = sensorHub;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            new Thread(() => StartConsumerLoop(stoppingToken)).Start();

            return Task.CompletedTask;
        }

        private async void StartConsumerLoop(CancellationToken cancellationToken)
        {
            _kafkaConsumer.Subscribe(_topic);

            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    var consumeResult = _kafkaConsumer.Consume(cancellationToken);

                    Event sensorEvent = JsonConvert.DeserializeObject<Event>(consumeResult.Message.Value);

                    _logger.LogInformation($"Info: SensorHandler => Processing the sensor: {sensorEvent.Tag} | [{consumeResult.Message.Timestamp}] - [{consumeResult.Partition}]");

                    await _producer.ProduceAsync("response", new Message<string, string> { Value = JsonConvert.SerializeObject(new { ok = true }) });

                    await _uow.EventRepository.Add(sensorEvent);

                    await _uow.Commit();

                    await _sensorHub.Clients.All.SendAsync("EventCreated", sensorEvent);

                    _logger.LogInformation($"Info: SensorHandler => Event Created: {sensorEvent.Tag}  [{sensorEvent.Value}]");
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (ConsumeException e)
                {
                    _logger.LogError($"Consume error: {e.Error.Reason}");

                    if (e.Error.IsFatal)
                    {
                        break;
                    }
                }
                catch (Exception e)
                {
                    _logger.LogError($"Consume error: {e}");
                    break;
                }
            }
        }

        public override void Dispose()
        {
            _kafkaConsumer.Close();
            _kafkaConsumer.Dispose();

            base.Dispose();
        }
    }
}
