using System.Text.Json.Serialization;

namespace ASPNETCoreWebAPI.Server.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public DateTime? DateTime { get; set; }

        [JsonIgnore]
        public Warehouse? WarehouseFrom { get; set; }
        public int WarehouseFromID { get; set; }

        [JsonIgnore]
        public Warehouse? WarehouseIn { get; set; }
        public int WarehouseInID { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }
        public int ProductID { get; set; }

        public int Count { get; set; }
    }
}
