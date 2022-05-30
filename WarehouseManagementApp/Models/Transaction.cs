namespace WarehouseManagementApp.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public DateTime DateTime { get; set; }
        public string? Operation { get; set; }
        public int Count { get; set; }
        public int WarehouseID { get; set; }
        public Warehouse? Warehouse { get; set; }
        public int ProductID { get; set; }
        public Product? Product { get; set; }
    }
}
