using System;

namespace SensorReporter.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Sensor { get; set; }
        public string Tag { get; set; }
        public long Timestamp { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
