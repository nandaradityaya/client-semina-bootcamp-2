import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, setPage, setDate } from "../../redux/orders/actions";
import { fetchListEvents } from "../../redux/lists/actions";
import DateRange from "../../components/InputDate";
import { formatDate } from "../../utils/formatDate";

function OrderPage() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);

  let [isShowed, setIsShowed] = React.useState(false); // untuk menampilkan date range picker jika di klik

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, orders.page, orders.date]);

  useEffect(() => {
    dispatch(fetchListEvents());
  }, [dispatch]);

  // redux yang di deklarasikan di atas akan di gunakan di bawah ini
  const displayDate = `${
    orders.date?.startDate ? formatDate(orders.date?.startDate) : ""
  }${orders.date?.endDate ? " - " + formatDate(orders.date.endDate) : ""}`; // untuk menampilkan tanggal yang di pilih di search input

  return (
    <Container className="mt-3">
      <BreadCrumb textSecound={"orders"} />
      <Row>
        <Col
          sm={4} // column untuk search input
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
          {isShowed ? (
            <DateRange
              date={orders.date} // untuk menampilkan tanggal yang di pilih di date range picker
              setIsShowed={() => setIsShowed(!isShowed)} // untuk menutup date range picker
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))} // untuk mengubah date yang di pilih
            />
          ) : (
            ""
          )}
        </Col>
      </Row>

      <Table
        status={orders.status}
        thead={[
          "Nama",
          "Email",
          "Judul",
          "Tanggal Event",
          "Tanggal Order",
          "Tempat",
        ]}
        data={orders.data}
        tbody={["name", "email", "title", "date", "orderDate", "venueName"]}
        pages={orders.pages} // total pages, di kirim ke component pagination
        actionNotDisplay
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))} // untuk handle pagination, +1 karena index dimulai dari 0
      />
    </Container>
  );
}

export default OrderPage;
