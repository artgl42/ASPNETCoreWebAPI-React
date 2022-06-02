using System.Text.Json.Serialization;

namespace WarehouseManagementServer.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;

        [JsonIgnore]
        public ICollection<Transaction>? Transactions { get; set; }
    }
}
