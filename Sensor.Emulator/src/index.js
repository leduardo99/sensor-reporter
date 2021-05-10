import dotenv from "dotenv";
import { Kafka, logLevel, CompressionTypes } from "kafkajs";
import faker from "faker";

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "sensor-group-receiver" });

const getRandomValue = (options) =>
  options[Math.floor(Math.random() * options.length)];

async function generateEvents() {
  const sensors = ["sensor01", "sensor02"];
  const values = [faker.datatype.float(1000), null];

  const sensor = getRandomValue(sensors);
  const eventValue = getRandomValue(values);

  const statusValue = !!eventValue ? "Processado" : "Erro";

  const region = faker.address.direction().toLocaleLowerCase();
  const tag = `brazil.${region}.${sensor}`;

  const event = {
    Sensor: sensor,
    Timestamp: Date.now(),
    Tag: tag,
    Value: eventValue,
    Status: statusValue,
    Latitude: faker.address.latitude(),
    Longitude: faker.address.longitude(),
  };

  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    compression: CompressionTypes.GZIP,
    messages: [{ value: JSON.stringify(event) }],
  });
}

async function startApplication() {
  try {
    await producer
      .connect()
      .then(() => console.log("KAFKA -> PRODUCER CONNECTED"));

    await consumer
      .connect()
      .then(() => console.log("KAFKA -> CONSUMER CONNECTED"));

    await consumer.subscribe({ topic: "response" });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.table({ topic, partition, message: String(message.value) });
      },
    });

    setInterval(() => generateEvents(), 1000);
  } catch (error) {
    console.error(error);
  }
}

startApplication().catch(console.error);
