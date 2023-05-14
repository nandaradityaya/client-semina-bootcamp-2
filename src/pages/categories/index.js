import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Table, Spinner } from "react-bootstrap";
import SButton from "../../components/Button";
import SBreadCrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";
import axios from "axios";
import { config } from "../../configs";

export default function PageCategories() {
  const token = localStorage.getItem("token"); // get token from localstorage | kalo ga ada, berarti user belum login
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategoriesAPI = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`, // set token ke header | ini utk cek apakah user sudah login atau belum
          },
        });

        setIsLoading(false);
        setData(res.data.data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getCategoriesAPI();
  }, []); // param ke 2 useEffect, kalo kosong, berarti useEffect ini akan dijalankan sekali saja ketika web di render, kalo ada value, maka useEffect ini akan dijalankan ketika value tersebut berubah

  if (!token) return <Navigate to="/signin" replace={true} />;

  return (
    <>
      <SNavbar />
      <Container className="mt-3">
        <SBreadCrumb textSecound="Categories" />

        <SButton action={() => navigate("/categories/create")}>Tambah</SButton>

        <Table className="mt-3" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={data.length + 1} style={{ textAlign: "center" }}>
                  <div className="flex items-center justify-center">
                    <Spinner animation="grow" variant="light" />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Otto</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
