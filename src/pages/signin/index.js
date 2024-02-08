import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import SForm from "./form";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux"; // useDispatch utk dispatch action ke redux | jadi ini untuk setiap kali ada perubahan di redux, maka akan di render ulang
import { userLogin } from "../../redux/auth/actions";

function PageSignin() {
  const dispatch = useDispatch(); // useDispatch utk dispatch action ke redux | jadi ini untuk setiap kali ada perubahan di redux, maka akan di render ulang

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
    // console.log("e.target.name");
    // console.log(e.target.name);
    // console.log("e.target.value");
    // console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value }); // spread formnya biar ga ke delete, yg mau kita ubah itu target name, yg mau kita ubah itu target value.
  }; // target name ambil dari name di form, target value ambil dari value di form

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await postData(`/cms/auth/signin`, form); // kirim data form ke API | kirim urlnya dan kirim payloadnya nanti ini di terima di parameter postData di utils/fetch.js | form itu si payload yg di kirim
    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.email,
          res.data.data.refreshToken
        ) // kirim data ke parameter di redux | kirim token, role, email, refreshToken ke src/redux/auth/actions.js
      ); // pake dispatch supaya kita bisa melakukan perubahan di actionnya, klo ga pake dispatch, kita ga bisa melakukan perubahan di actionnya dan gabisa manggil si userLogin
      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        message: res?.response?.data?.msg ?? "Something went wrong",
        type: "danger",
      });
    }
  };

  return (
    <Container>
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert message={alert.message} type={alert.type} />}
        {/* klo alert true maka tampilin alert, klo false maka ga tampilin alert */}
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
