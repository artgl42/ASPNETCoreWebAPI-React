using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseManagementApp.Models;

namespace WarehouseManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TransactionController(AppDbContext dbContext) => _db = dbContext;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionaAsync()
        {
            return Ok(await _db.Transactions.ToArrayAsync());
        }

        [HttpGet("{transactionID}")]
        public async Task<ActionResult<Transaction>> GetTransactionAsync(int transactionID)
        {
            var _transaction = await _db.Transactions
                .FirstOrDefaultAsync(transaction => transaction.ID == transactionID);

            if (_transaction is null)
            {
                return NotFound();
            }

            return new JsonResult(_transaction);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Transaction>>> CreateTransactionAsync(Transaction transactionToCreate)
        {
            if (transactionToCreate is null)
            {
                return BadRequest();
            }

            _db.Transactions.Add(transactionToCreate);
            await _db.SaveChangesAsync();
            return Ok(await _db.Transactions.ToArrayAsync());
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Transaction>>> UpdateTransactionAsync(Transaction transactionToUpdate)
        {
            if (transactionToUpdate is null)
            {
                return BadRequest();
            }

            if (!_db.Transactions.Any(transaction => transaction.ID == transactionToUpdate.ID))
            {
                return NotFound();
            }

            _db.Transactions.Update(transactionToUpdate);
            await _db.SaveChangesAsync();
            return Ok(await _db.Transactions.ToArrayAsync());
        }

        [HttpDelete("{transactionID}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> DeleteProductAsync(int transactionID)
        {
            var _transactionToDel = await _db.Transactions.
                FirstOrDefaultAsync(transaction => transaction.ID == transactionID);

            if (_transactionToDel is null)
            {
                return NotFound();
            }

            _db.Transactions.Remove(_transactionToDel);
            await _db.SaveChangesAsync();
            return Ok(await _db.Transactions.ToArrayAsync());
        }
    }
}
