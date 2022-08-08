using Microsoft.EntityFrameworkCore;

namespace WarehouseManagementServer.Models
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


            Warehouse[] _warehouses = new Warehouse[4];
            _warehouses[0] = new Warehouse
            {
                ID = 1,
                Name = "Debit",
                Address = "Virtual debit warehouse"
            };
            _warehouses[1] = new Warehouse
            {
                ID = 2,
                Name = "Credit",
                Address = "Virtual credit warehouse"
            };
            for (int i = 2; i < _warehouses.Length; i++)
            {
                _warehouses[i] = new Warehouse
                {
                    ID = i + 1,
                    Name = $"Warehouse {i - 1}",
                    Address = $"Warehouse address {i - 1}"
                };
            }

            Random _random = new Random();
            string _chars = "ABCDEFGIKLMNOPQRSTYUXW";
            Product[] _products = new Product[25];
            for (int i = 0; i < _products.Length; i++)
            {
                _products[i] = new Product
                {
                    ID = i + 1,
                    Name = $"{_chars[_random.Next(_chars.Length)]}Product{i + 1}",
                    Price = _random.NextInt64(0, 10000)
                };
            }

            Transaction[] _transactions = new Transaction[2];
            _transactions[0] = new Transaction
            {
                ID = 1,
                DateTime = DateTime.Parse("2022-05-25"),
                WarehouseFromID = 3,
                WarehouseInID = 1,
                ProductID = 1,
                Count = -100
            };
            _transactions[1] = new Transaction
            {
                ID = 2,
                DateTime = DateTime.Parse("2022-05-25"),
                WarehouseFromID = 1,
                WarehouseInID = 3,
                ProductID = 1,
                Count = 100
            };

            modelBuilder.Entity<Warehouse>().HasData(_warehouses);
            modelBuilder.Entity<Product>().HasData(_products);
            modelBuilder.Entity<Transaction>().HasData(_transactions);
        }
    }
}
