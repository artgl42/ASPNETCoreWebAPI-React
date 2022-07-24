import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [status, setStatus] = useState({
    loading: false,
    data: null,
    error: null,
  });

  function fetchData(url, options) {
    setStatus({ ...status, loading: true });
    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        else return response.json();
      })
      .then((result) => {
        setStatus({ ...status, loading: false, data: result });
      })
      .catch((error) => {
        setStatus({ ...status, loading: false, error });
      });
  }

  useEffect(() => {
    if (url) {
      fetchData(url, options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...status, fetchData };
};

export default useFetch;
