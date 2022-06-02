using System.Text.Json.Serialization;

namespace WarehouseManagementServer.Models
{
    public class Warehouse
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Transaction>? TransactionsFrom { get; set; }
        [JsonIgnore]
        public ICollection<Transaction>? TransactionsIn { get; set; }
    }
}
