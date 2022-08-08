import { useState } from "react";

export default function useFetch() {
  const [status, setStatus] = useState({
    loading: false,
    pagination: null,
    data: null,
    error: null,
  });

  function fetchData(url, options) {
    setStatus({ ...status, loading: true });
    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        else
          return response.json().then((result) => ({
            header: response.headers.get("X-Pagination"),
            result,
          }));
      })
      .then(({ header, result }) => {
        setStatus({
          ...status,
          pagination: header,
          loading: false,
          data: result,
        });
      })
      .catch((error) => {
        setStatus({ ...status, loading: false, error });
      });
  }

  function fetchGet(url, page = 1, itemPerPage = 50) {
    fetchData(`${url}?Page=${page}&ItemsPerPage=${itemPerPage}`);
  }

  function fetchCreate(url, objToCreate) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objToCreate),
    };
    fetchData(url, options);
  }

  function fetchUpdate(url, objToUpdate) {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objToUpdate),
    };
    fetchData(url, options);
  }

  function fetchDelete(url, id) {
    const options = {
      method: "DELETE",
    };
    const api = `${url}/${id}`;
    fetchData(api, options);
  }

  return {
    status,
    fetchGet,
    fetchCreate,
    fetchUpdate,
    fetchDelete,
  };
}
