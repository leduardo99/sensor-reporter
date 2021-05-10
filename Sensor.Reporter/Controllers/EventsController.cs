using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SensorReporter.Interfaces;
using SensorReporter.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SensorReporter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly ILogger<EventsController> _logger;

        public EventsController(IUnitOfWork uow, ILogger<EventsController> logger)
        {
            _uow = uow;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Event>> Get()
        {
            return await _uow.EventRepository.GetAll();
        }
    }
}
