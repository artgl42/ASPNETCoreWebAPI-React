using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseManagementApp.Models;

namespace WarehouseManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WarehouseController : ControllerBase
    {
        private readonly AppDbContext _db;
        public WarehouseController(AppDbContext dbContext) => _db = dbContext;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Warehouse>>> GetWarehousesAsync()
        {
            return Ok(await _db.Warehouses.ToArrayAsync());
        }
    }
}
