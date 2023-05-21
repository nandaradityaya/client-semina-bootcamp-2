import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import SForm from "./form";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux"; // useDispatch utk dispatch action ke redux | jadi ini untuk setiap kali ada perubahan di redux, maka akan di render ulang
import { userLogin } from "../../redux/auth/actions";

function PageSignin() {
  const dispatch = useDispatch();

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
      const res = await postData(`/cms/auth/signin`, form); // kirim data ke API | kirim urlnya dan kirim payloadnya nanti ini di terima di parameter postData di utils/fetch.js

      dispatch(userLogin(res.data.data.token, res.data.data.role)); // pake dispatch supaya kita bisa melakukan perubahan di actionnya, klo ga pake dispatch, kita ga bisa melakukan perubahan di actionnya dan gabisa manggil si userLogin
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
