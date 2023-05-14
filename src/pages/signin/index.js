import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import SAlert from "../../components/Alert";
import { useNavigate, Navigate } from "react-router-dom";
import SForm from "./form";

import { config } from "../../configs"; // importnya harus dalam bentuk object karna exportnya di sana juga dalam bentuk object

function PageSignin() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "danger",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // spread formnya biar ga ke delete, yg mau kita ubah itu target name, yg mau kita ubah itu target value
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${config.api_host_dev}/cms/auth/signin`,
        form
      );

      console.log(res.data.data.token);
      localStorage.setItem("token", res.data.data.token); // set token ke local storage, fungsinya untuk ngecek user udah login atau belum
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? "Something went wrong",
        type: "danger",
      });
    }
  };

  if (token) return <Navigate to="/" replace={true} />; // kalo tokennya ada, berarti redirect ke page dashboard

  return (
    <Container>
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert message={alert.message} type={alert.type} />}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Login</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
