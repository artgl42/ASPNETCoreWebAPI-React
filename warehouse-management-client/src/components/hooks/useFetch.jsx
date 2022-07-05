/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [status, setStatus] = useState({
    loading: false,
    data: null,
    error: null,
  });

  function fetchData(url, options) {
    setStatus({ loading: true });
    fetch(url, options)
      .then((result) => {
        switch (result.status) {
          case 200:
            return result.json();
          case 204:
            return result.json();
          default:
            throw new Error(result.status);
        }
      })
      .then((result) => {
        setStatus({ loading: false, data: result });
      })
      .catch((error) => {
        setStatus({ loading: false, error });
      });
  }

  useEffect(() => {
    if (url) {
      fetchData(url, options);
    }
  }, []);

  return { ...status, fetchData };
};

export default useFetch;
