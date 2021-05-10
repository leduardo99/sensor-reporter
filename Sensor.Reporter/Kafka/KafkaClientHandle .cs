using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using System;

namespace SensorReporter.Kafka
{
    public class KafkaClientHandle : IDisposable
    {
        IProducer<byte[], byte[]> kafkaProducer;

        public KafkaClientHandle(IConfiguration config)
        {
            var conf = new ProducerConfig()
            {
                ClientId = config.GetValue<string>("KAFKA_CLIENT_ID"),
                BootstrapServers = config.GetValue<string>("KAFKA_BROKER")
            };
            this.kafkaProducer = new ProducerBuilder<byte[], byte[]>(conf).Build();
        }

        public Handle Handle { get => this.kafkaProducer.Handle; }

        public void Dispose()
        {
            kafkaProducer.Flush();
            kafkaProducer.Dispose();
        }
    }
}
