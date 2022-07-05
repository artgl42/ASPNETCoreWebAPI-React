import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Stack } from 'react-bootstrap';
import Urls from '../util/Urls';

export default function ProductsOfWarehouse({ id }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState('');

  useEffect(() => {
    setProducts([]);
    setProductsCount('');

    const formatedDate = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;
    const url = `${Urls.API_URL_GET_ALL_PRODUCTS_ON_DATE}/${formatedDate}/${id}`;

    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error(response.status);
      })
      .then((response) => {
        setProducts(response);
        setProductsCount(response.length);
      })
      .catch(() => {
        setProductsCount(0);
      });
  }, [id, date]);

  function handleChange(e) {
    setDate(e.target.value);
  }

  return (
    <Stack className="col-md-12 mx-auto">
      <Stack className="col-md-6 mx-auto">
        <input type="date" value={date} onChange={handleChange} />
        <br />
        <h4>{`Warehouse (id): ${id}`}</h4>
        <h4>{`Date (selected): ${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`}</h4>
        <h4>{`Products (count): ${productsCount}`}</h4>
        <br />
      </Stack>
      {productsCount !== 0 && productsCount !== '' && (
        <Table striped hover size="sm">
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
        </Table>
      )}
    </Stack>
  );
}
ProductsOfWarehouse.propTypes = {
  id: PropTypes.number.isRequired,
};
