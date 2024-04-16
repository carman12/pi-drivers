import React, { useEffect } from "react";
import '../Paginate/pages.css';

export const Pagination = ({
  driversPerPage,
  totalDrivers,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalDrivers / driversPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  const onFirstPage = () => {
    setCurrentPage(1);
  };

  const onLastPage = () => {
    setCurrentPage(totalPages);
  };


  const maxDisplayedPages = 5;
  const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);

  let startPage = Math.max(1, currentPage - halfMaxDisplayedPages);
  let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

  if (endPage - startPage < maxDisplayedPages - 1) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }

  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  //quiero que redirija a la pagina 1 cuando hago una busqueda
  if (currentPage > totalPages) {
    useEffect(() => {
      setCurrentPage(1);
    }, []);
  }
  

  return (
    <nav role="navigation" aria-label="pagination" className='pagi'>

{currentPage > 2 && (
        <a className={`pagination-link`} onClick={onFirstPage}>
          <button className='button2'>First</button>
        </a>
      )}
      <a
        className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`}
        onClick={onPreviusPage}
      >
        <button className='button2'>Previous</button>
      </a>

      {visiblePageNumbers.map((noPage) => (
        <p key={noPage}>
          <a
            className={`pagination-link ${noPage === currentPage ? "is-active" : ""}`}
            onClick={() => onSpecificPage(noPage)}>
            {noPage}
          </a>
        </p>
      ))}
      
      <a
        className={`pagination-link ${currentPage >= pageNumbers.length ? "is-disabled" : ""}`}
        onClick={onNextPage}
      >
        <button className='button2'>Next page</button>
        
      </a>
      {currentPage < totalPages - 1 && (
        <a className={`pagination-link`} onClick={onLastPage}>
          <button className='button2'>Last</button>
        </a>
      )}

    </nav>
  );
};
