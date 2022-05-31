namespace WarehouseManagementApp.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public DateTime DateTime { get; set; }
        public int WarehouseFromID { get; set; }
        public Warehouse WarehouseFrom { get; set; }
        public int WarehouseInID { get; set; }
        public Warehouse WarehouseIn { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }
        public int Count { get; set; }
    }
}
