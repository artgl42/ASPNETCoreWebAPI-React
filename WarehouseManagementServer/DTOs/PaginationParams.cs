﻿namespace WarehouseManagementServer.DTOs
{
    public class PaginationParams
    {
        public int Page { get; set; } = 1;
        public int ItemsPerPage { get; set; } = 100;
    }
}
