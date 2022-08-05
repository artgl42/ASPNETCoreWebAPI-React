import React, { useState, useEffect, useMemo } from "react";
// @ts-ignore
import { Pagination } from "react-bootstrap";

export default function PaginationUI({
  startPage,
  itemsPerPage,
  pagination,
  getItems,
}) {
  const [totalPages, setTotalPages] = useState(0);
  const [limitPerPage] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(startPage);

  useEffect(() => {
    const paginationOpt = JSON.parse(pagination);
    if (paginationOpt !== null) {
      setTotalPages(paginationOpt.TotalPages);
      setCurrentPage(paginationOpt.CurrentPage);
    }
  }, [pagination]);

  const getPagesArray = useMemo(() => {
    let result = Array.from({ length: totalPages }, (_, i) => i + 1);
    return result;
  }, [totalPages]);

  return (
    <Pagination>
      <Pagination.First onClick={() => getItems(1, limitPerPage)} />
      <Pagination.Prev
        onClick={() =>
          getItems(currentPage > 1 ? currentPage - 1 : 1, limitPerPage)
        }
      />
      {getPagesArray !== null &&
        getPagesArray.map((page) =>
          page === currentPage ? (
            <Pagination.Item key={page} active>
              {page}
            </Pagination.Item>
          ) : (
            <Pagination.Item
              key={page}
              onClick={() => getItems(page, limitPerPage)}
            >
              {page}
            </Pagination.Item>
          )
        )}

      <Pagination.Next
        onClick={() =>
          getItems(
            currentPage < totalPages ? currentPage + 1 : currentPage,
            limitPerPage
          )
        }
      />
      <Pagination.Last onClick={() => getItems(totalPages, limitPerPage)} />
    </Pagination>
  );
}
