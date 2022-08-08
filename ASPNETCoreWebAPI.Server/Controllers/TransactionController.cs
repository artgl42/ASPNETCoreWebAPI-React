using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASPNETCoreWebAPI.Server.DTOs;
using ASPNETCoreWebAPI.Server.Models;

namespace ASPNETCoreWebAPI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TransactionController(AppDbContext dbContext) => _db = dbContext;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionsAsync([FromQuery] PaginationParams @params)
        {
            var _transactionsAll = _db.Transactions
                .Select(transaction => new
                {
                    transaction.ID,
                    transaction.DateTime,
                    transaction.WarehouseFrom,
                    transaction.WarehouseIn,
                    transaction.Product,
                    transaction.Count
                });
                
            var _paginationMetadata = new PaginationMetadata(@params.Page, _transactionsAll.Count(), @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(_paginationMetadata));
            var _transactionsSelected = await _transactionsAll
                .Skip((@params.Page - 1) * @params.ItemsPerPage)
                .Take(@params.ItemsPerPage)
                .ToListAsync();

            return Ok(_transactionsSelected);
        }

        [HttpGet("{transactionID}")]
        public async Task<ActionResult<Transaction>> GetTransactionAsync(int transactionID)
        {
            var _transaction = await _db.Transactions
                .FirstOrDefaultAsync(transaction => transaction.ID == transactionID);

            return Ok(_transaction);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Transaction>>> CreateTransactionAsync(Transaction transaction)
        {
            if (transaction is null)
            {
                return BadRequest();
            }

            var _transactionCredit = new Transaction
            {
                WarehouseFromID = transaction.WarehouseInID,
                WarehouseInID = transaction.WarehouseFromID,
                ProductID = transaction.ProductID,
                Count = -Convert.ToInt32(transaction.Count),
                DateTime = transaction.DateTime
            };

            _db.Transactions.Add(_transactionCredit);
            _db.Transactions.Add(transaction);
            await _db.SaveChangesAsync();
            return CreatedAtAction("GetTransaction", new { transactionID = transaction.ID }, transaction);
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Transaction>>> UpdateTransactionAsync(Transaction transaction)
        {
            if (transaction is null)
            {
                return BadRequest();
            }

            if (!_db.Transactions.Any(transaction => transaction.ID == transaction.ID))
            {
                return NotFound();
            }

            _db.Transactions.Update(transaction);
            await _db.SaveChangesAsync();
            return CreatedAtAction("GetTransaction", new { transactionID = transaction.ID }, transaction);
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
            return Ok(_transactionToDel);
        }
    }
}
