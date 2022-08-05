using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseManagementServer.DTOs;
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
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsync([FromQuery] PaginationParams @params)
        {
            var _productsAll = _db.Products;
            var _paginationMetadata = new PaginationMetadata(@params.Page, _productsAll.Count(), @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(_paginationMetadata));
            var _productsSelected = await _productsAll
                .Skip((@params.Page - 1) * @params.ItemsPerPage)
                .Take(@params.ItemsPerPage)
                .ToListAsync();
            return Ok(_productsSelected);
        }

        [HttpGet("{productID}")]
        public async Task<ActionResult<Product>> GetProductAsync(int productID)
        {
            var _product = await _db.Products
                .FirstOrDefaultAsync(product => product.ID == productID);

            return Ok(_product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProductAsync(Product productToCreate)
        {
            if (productToCreate is null)
            {
                return BadRequest();
            }

            _db.Products.Add(productToCreate);
            await _db.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { productID = productToCreate.ID }, productToCreate);
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
            return CreatedAtAction("GetProduct", new { productID = productToUpdate.ID }, productToUpdate);
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
            return Ok(_productToDel);
        }
    }
}
