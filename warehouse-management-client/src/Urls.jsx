const API_URL_BASE = 'https://localhost:7182/api';

const PRODUCT_ENDPOINTS = {
  GET_ALL_PRODUCTS: 'Product',
};

const WAREHOUSE_ENDPOINTS = {
  GET_ALL_WAREHOUSES: 'Warehouse',
};

const TRANSACTION_ENDPOINTS = {
  GET_ALL_TRANSACTIONS: 'Transaction',
};

const REPORT_ENDPOINTS = {
  GET_ALL_PRODUCTS_ON_DATE: 'Report',
};

const API_URL_FULL = {
  API_URL_GET_ALL_PRODUCTS:
    `${API_URL_BASE}/${PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS}`,
  API_URL_GET_ALL_WAREHOUSES:
    `${API_URL_BASE}/${WAREHOUSE_ENDPOINTS.GET_ALL_WAREHOUSES}`,
  API_URL_GET_ALL_TRANSACTIONS:
    `${API_URL_BASE}/${TRANSACTION_ENDPOINTS.GET_ALL_TRANSACTIONS}`,
  API_URL_GET_ALL_PRODUCTS_ON_DATE:
    `${API_URL_BASE}/${REPORT_ENDPOINTS.GET_ALL_PRODUCTS_ON_DATE}`,
};

const Urls = API_URL_FULL;
export default Urls;
