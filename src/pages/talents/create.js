import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function TalentsCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    role: "",
    file: "",
    avatar: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file) => {
    let formData = new FormData(); // klo mau upload file harus pake new FormData()
    formData.append("avatar", file); // append ke avatar dan valuenya file yang di upload
    const res = await postData("/cms/images", formData, true); // post ke /cms/images dengan formData dan true | true itu untuk multipart/form-data (liat di fetch.js)
    return res; // return res nya dan simpan ke dalam file
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2); // size harus dibawah 3 MB

        if (size > 2) {
          // klo lebih dari 2mb maka akan muncul alert
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          }); // klo lebih dari 2mb setFormnya kosong
        } else {
          const res = await uploadImage(e.target.files[0]); // klo kurang dari 2mb maka akan upload image

          setForm({
            ...form,
            file: res.data.data._id, // res di uploadImage simpan ke dalam file, lalu ambil id imagenya dan simpan ke dalam file
            [e.target.name]: res.data.data.name, // ambil nama imagenya dan simpan ke dalam avatar agar di formnya bisa muncul preview image
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true); // loading dulu sebelum post ke server

    const payload = {
      image: form.file,
      role: form.role,
      name: form.name,
    }; // simpan payload untuk dikirim ke server | samain aja seperti body di postman

    const res = await postData("/cms/talents", payload);

    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah talents ${res.data.data.name}`
        )
      );
      navigate("/talents");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecound={"Talents"}
        urlSecound={"/talents"}
        textThird="Create"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default TalentsCreate;
