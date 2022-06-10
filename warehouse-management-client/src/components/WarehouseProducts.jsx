import React, { useState } from "react";
import Constants from "../Constants";

export default function WarehouseProducts(props) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([]);

  function handleChange(e) {
    setDate(e.target.value);
  }

  function getProducts() {
    setProducts([]);
    const formatedDate = `${new Date(date).getFullYear()}-${
      new Date(date).getMonth() + 1
    }-${new Date(date).getDate()}`;
    const url = `${Constants.API_URL_GET_ALL_PRODUCTS_ON_DATE}/${formatedDate}/${props.value[0]}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error(response.status);
      })
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h2>{props.value[1]}</h2>
      <input type="date" value={date} onChange={handleChange} />
      <button
        onClick={getProducts}
        className="btn btn-outline-success btn-sm mx-1 my-1"
      >
        Show
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product.id}>
                <td>{product.product.name}</td>
                <td>{product.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
