import React from "react";
import { useEffect, useState } from "react";
import Pagination from "react-responsive-pagination";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  if (totalPages === 0) return null;

  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={onPageChange}
      extraClassName="justify-content-start"
      srOnlyClassName=""
    />
  );
};

export default PaginationComponent;
