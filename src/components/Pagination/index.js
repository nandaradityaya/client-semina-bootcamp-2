import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const { pages, handlePageClick, page = 1 } = props; // props yang di terima dari component Table, page = 1 karena kita mau nampilin data dari page 1
  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={
        <span role="button" className="page-link">
          ...
        </span>
      }
      breakClassName={"page-item"}
      pageCount={pages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      activeClassName={"active"}
      forcePage={page - 1}
    />
  );
};

export default Pagination;
