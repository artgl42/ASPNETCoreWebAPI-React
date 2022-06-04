import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const url = Constants.API_URL_GET_ALL_PRODUCTS;

  function getProducts() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button
                  onClick={() => console.log("Button Update")}
                  className="btn btn-outline-success btn-sm mx-1 my-1"
                >
                  Update
                </button>
                <button
                  onClick={() => console.log("Button Delete")}
                  className="btn btn-outline-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={getProducts} className="btn btn-outline-primary btn-sm w-100">
          Get products from server
        </button>
        <button
          onClick={() => setProducts([])}
          className="btn btn-outline-success btn-sm w-100"
        >
          Create product
        </button>
        <button
          onClick={() => setProducts([])}
          className="btn btn-outline-danger btn-sm w-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
