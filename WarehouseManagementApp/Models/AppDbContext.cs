using Microsoft.EntityFrameworkCore;

namespace WarehouseManagementApp.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> contextOptions)
            : base(contextOptions)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>()
                    .HasOne(x => x.WarehouseFrom)
                    .WithMany(x => x.TransactionsFrom)
                    .HasForeignKey(x => x.WarehouseFromID)
                    .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<Transaction>()
                        .HasOne(x => x.WarehouseIn)
                        .WithMany(x => x.TransactionsIn)
                        .HasForeignKey(x => x.WarehouseInID)
                        .OnDelete(DeleteBehavior.ClientSetNull);

            const byte WAREHOUSES = 4;
            const byte PRODUCTS = 5;
            const byte TRANSACTIONS = 2;

            Warehouse[] _warehouses = new Warehouse[WAREHOUSES];
            for (int i = 0; i < _warehouses.Length; i++)
            {
                _warehouses[i] = new Warehouse { 
                    ID = i + 1, 
                    Name = $"Warehouse {i + 1}", 
                    Address = $"Address {i + 1}" 
                };
            }

            Random _random = new Random();

            Product[] _products = new Product[PRODUCTS];
            for (int i = 0; i < _products.Length; i++)
            {
                _products[i] = new Product { 
                    ID = i + 1, 
                    Name = $"Product {i}", 
                    Price = _random.NextInt64(0, 10000) 
                };
            }

            Transaction[] _transactions = new Transaction[TRANSACTIONS];
            for (int i = 0; i < _transactions.Length; i++)
            {
                _transactions[i] = new Transaction { 
                    ID = i + 1,                  
                    DateTime = DateTime.Parse("2022-05-25"), 
                    WarehouseFromID = 1,
                    WarehouseInID = 2,
                    ProductID = 1,
                    Count = (int)_random.NextInt64(0, 1000)
                };
            }

            modelBuilder.Entity<Warehouse>().HasData(_warehouses);
            modelBuilder.Entity<Product>().HasData(_products);
            modelBuilder.Entity<Transaction>().HasData(_transactions);
        }
    }
}
