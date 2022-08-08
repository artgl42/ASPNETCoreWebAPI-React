const API_URL_BASE = "https://localhost:7182/api/";

const ENDPOINTS = {
  PRODUCTS: "Product",
  WAREHOUSES: "Warehouse",
  TRANSACTIONS: "Transaction",
  REPORTS: "Report",
};

export const API_URL_PRODUCTS = `${API_URL_BASE}${ENDPOINTS.PRODUCTS}`;
export const API_URL_WAREHOUSES = `${API_URL_BASE}${ENDPOINTS.WAREHOUSES}`;
export const API_URL_TRANSACTIONS = `${API_URL_BASE}${ENDPOINTS.TRANSACTIONS}`;
export const API_URL_REPORTS = `${API_URL_BASE}${ENDPOINTS.REPORTS}`;
