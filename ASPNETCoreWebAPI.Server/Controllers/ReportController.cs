using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASPNETCoreWebAPI.Server.Models;

namespace ASPNETCoreWebAPI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ReportController(AppDbContext dbContext) => _db = dbContext;

        [HttpGet("{date}/{warehouseID}")]
        public async Task<ActionResult> GetProductsOnDateAsync(DateTime date, int warehouseID)
        {
            var _productsInWarehouse = await _db.Transactions
                    .Where(transaction => transaction.WarehouseInID == warehouseID && transaction.DateTime <= date.Date)
                    .GroupBy(transaction => transaction.ProductID)
                    .Select(transaction => new 
                    {
                        transaction.First().Product,
                        Count = transaction.Sum(transaction => transaction.Count)
                    }).ToListAsync();

            return Ok( _productsInWarehouse);
        }
    }
}
