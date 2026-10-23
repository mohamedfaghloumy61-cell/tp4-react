import React from 'react';

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return <div className="pagination">
    <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Précédent</button>
    <span>Page {page} / {totalPages}</span>
    <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Suivant</button>
  </div>;
}
export default Pagination;
