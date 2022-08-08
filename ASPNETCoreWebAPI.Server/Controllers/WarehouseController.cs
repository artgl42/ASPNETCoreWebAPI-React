using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASPNETCoreWebAPI.Server.Models;

namespace ASPNETCoreWebAPI.Server.Controllers
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

        [HttpGet("{warehouseID}")]
        public async Task<ActionResult<Warehouse>> GetWarehouseAsync(int warehouseID)
        {
            var _warehouse = await _db.Warehouses
                .FirstOrDefaultAsync(warehouse => warehouse.ID == warehouseID);

            return Ok(_warehouse);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Warehouse>>> CreateWarehouseAsync(Warehouse warehouseToCreate)
        {
            if (warehouseToCreate is null)
            {
                return BadRequest();
            }

            _db.Warehouses.Add(warehouseToCreate);
            await _db.SaveChangesAsync();
            return await GetWarehousesAsync();
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Warehouse>>> UpdateWarehouseAsync(Warehouse warehouseToUpdate)
        {
            if (warehouseToUpdate is null)
            {
                return BadRequest();
            }

            if (!_db.Warehouses.Any(warehouse => warehouse.ID == warehouseToUpdate.ID))
            {
                return NotFound();
            }

            _db.Warehouses.Update(warehouseToUpdate);
            await _db.SaveChangesAsync();
            return await GetWarehousesAsync();
        }

        [HttpDelete("{warehouseID}")]
        public async Task<ActionResult<IEnumerable<Warehouse>>> DeleteWarehouseAsync(int warehouseID)
        {
            var _warehouseToDel = await _db.Warehouses.
                FirstOrDefaultAsync(warehouse => warehouse.ID == warehouseID);

            if (_warehouseToDel is null)
            {
                return NotFound();
            }

            _db.Warehouses.Remove(_warehouseToDel);
            await _db.SaveChangesAsync();
            return await GetWarehousesAsync();
        }
    }
}
