import React from "react";
import { Table } from "react-bootstrap";
import Pagination from "../Pagination";
import Tbody from "../TbodyWithAction";
import Thead from "../Thead";

function TableWithAction({
  withoutPagination,
  actionNotDisplay,
  handlePageClick,
  data,
  thead,
  tbody,
  editUrl,
  deleteAction,
  pages,
  customAction,
  status,
}) {
  return (
    <>
      <Table striped bordered hover>
        <Thead text={thead} />
        <Tbody
          status={status} // kirim status ke TbodyWithAction | statusnya dari redux yg di map di halaman yg memakai component ini  (statusnya process & success)
          data={data} //  kirim data ke TbodyWithAction | datanya dari redux yg di map di halaman yg memakai component ini (datanya array)
          display={tbody} // kirim display ke TbodyWithAction | displaynya dari halaman yg memakai component ini (displaynya array)
          editUrl={editUrl}
          deleteAction={deleteAction}
          actionNotDisplay={actionNotDisplay}
          customAction={customAction}
        />
      </Table>
      {!withoutPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ""
      )}
    </>
  );
}

export default TableWithAction;
