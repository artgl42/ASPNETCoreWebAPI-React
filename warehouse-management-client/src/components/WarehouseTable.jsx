import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function WarehouseTable() {
  const [warehouses, setWarehouses] = useState([]);
  const url = Constants.API_URL_GET_ALL_WAREHOUSES;

  function getWarehouses() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setWarehouses(response);
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
            <th scope="col">Address</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <th scope="row">{warehouse.id}</th>
              <td>{warehouse.name}</td>
              <td>{warehouse.address}</td>
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
        <button onClick={getWarehouses} className="btn btn-outline-primary btn-sm w-100">
          Get warehouses from server
        </button>
        <button
          onClick={() => setWarehouses([])}
          className="btn btn-outline-success btn-sm w-100"
        >
          Create product
        </button>
        <button
          onClick={() => setWarehouses([])}
          className="btn btn-outline-danger btn-sm w-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
