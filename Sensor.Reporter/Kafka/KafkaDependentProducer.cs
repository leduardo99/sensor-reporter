using Confluent.Kafka;
using System;
using System.Threading.Tasks;

namespace SensorReporter.Kafka
{
    public class KafkaDependentProducer<K, V>
    {
        readonly IProducer<K, V> kafkaHandle;

        public KafkaDependentProducer(KafkaClientHandle handle)
        {
            kafkaHandle = new DependentProducerBuilder<K, V>(handle.Handle).Build();
        }

        public Task ProduceAsync(string topic, Message<K, V> message)
            => kafkaHandle.ProduceAsync(topic, message);

        public void Flush(TimeSpan timeout)
            => kafkaHandle.Flush(timeout);
    }
}
