import React, { useState } from "react";
import Constants from "../Constants";

export default function WarehouseProducts(props) {
  const [date, setDate] = useState(new Date());
  const [products, setProducts] = useState([]);

  function handleChange(e) {
    setDate(e.target.value);
    getProducts();
  }

  function getProducts() {
    const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const url = `${Constants.API_URL_GET_ALL_PRODUCTS_ON_DATE}/${formatedDate}/${props.value}`;
    //console.log(url);

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
    <div>
      <input type="date" defaultValue={date} onChange={handleChange} />
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
              <tr key={product.id}>
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
