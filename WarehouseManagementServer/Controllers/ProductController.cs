using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseManagementServer.Models;

namespace WarehouseManagementServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductController(AppDbContext dbContext) => _db = dbContext;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsync()
        {
            return Ok(await _db.Products.ToArrayAsync());
        }

        [HttpGet("{productID}")]
        public async Task<ActionResult<Product>> GetProductAsync(int productID)
        {
            var _product = await _db.Products
                .FirstOrDefaultAsync(product => product.ID == productID);

            return Ok(_product);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Product>>> CreateProductAsync(Product productToCreate)
        {
            if (productToCreate is null)
            {
                return BadRequest();
            }

            _db.Products.Add(productToCreate);
            await _db.SaveChangesAsync();
            return Ok(await _db.Products.ToArrayAsync());
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Product>>> UpdateProductAsync(Product productToUpdate)
        {
            if (productToUpdate is null)
            {
                return BadRequest();
            }

            if (!_db.Products.Any(product => product.ID == productToUpdate.ID))
            {
                return NotFound();
            }

            _db.Products.Update(productToUpdate);
            await _db.SaveChangesAsync();
            return Ok(await _db.Products.ToArrayAsync());
        }

        [HttpDelete("{productID}")]
        public async Task<ActionResult<IEnumerable<Product>>> DeleteProductAsync(int productID)
        {
            var _productToDel = await _db.Products.
                FirstOrDefaultAsync(product => product.ID == productID);

            if (_productToDel is null)
            {
                return NotFound();
            }

            _db.Products.Remove(_productToDel);
            await _db.SaveChangesAsync();
            return Ok(await _db.Products.ToArrayAsync());
        }
    }
}
