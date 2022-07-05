import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Stack } from 'react-bootstrap';
import Urls from '../util/Urls';
import useFetch from '../hooks/useFetch';
import LoadSpinner from '../util/LoadSpinner';

export default function ProductsOfWarehouse({ id }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const formatedDate = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;
  const { data, loading, error } = useFetch(`${Urls.API_URL_GET_ALL_PRODUCTS_ON_DATE}/${formatedDate}/${id}`);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading) {
      setProducts(data);
    }
  }, [id, date, loading, data]);

  function handleChange(e) {
    setDate(e.target.value);
  }

  if (error) {
    // eslint-disable-next-line no-console
    // console.log('Error!!!', error);
    // console.log('loading = ', error);
    // console.log('products = ', Array.isArray(products).length);
    return null;
  }
  if (loading) return <LoadSpinner />;
  return (
    <Stack className="col-md-12 mx-auto">
      <Stack className="col-md-6 mx-auto">
        <input type="date" value={date} onChange={handleChange} />
        <br />
        <h4>{`Warehouse (id): ${id}`}</h4>
        <h4>{`Date (selected): ${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`}</h4>
        <br />
      </Stack>
      {true && (
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {products !== null && products.map((product) => (
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
