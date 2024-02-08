import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
import {
  fetchListCategories,
  fetchListTalents,
} from "../../redux/lists/actions";

function EventsCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists); // ini untuk mengambil state lists dari redux store (select2)
  const [form, setForm] = useState({
    title: "",
    price: "",
    date: "",
    file: "",
    avatar: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""], // array of string
    tickets: [
      {
        type: "",
        statusTicketCategories: "",
        stock: "",
        price: "",
      },
    ], // array of object
    category: "",
    talent: "",
    stock: "",
  }); // state form untuk menampung data dari form

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  }); // messae alert

  const [isLoading, setIsLoading] = useState(false);

  // fetching talents and categories
  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
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
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
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
    } else if (e.target.name === "category" || e.target.name === "talent") {
      console.log("e.target.name");
      console.log(e.target.name);
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      date: form.date,
      image: form.file,
      title: form.title,
      price: form.price,
      about: form.about,
      venueName: form.venueName,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      category: form.category.value,
      talent: form.talent.value,
      status: form.status,
      tickets: form.tickets,
    };

    const res = await postData("/cms/events", payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah events ${res.data.data.title}`
        )
      );
      navigate("/events");
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

  // handle keypoint untuk menambahkan keypoint
  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint]; // simpan variable keypoint ke _temp

    _temp[i] = e.target.value; // ambil spesific berdasarkan index arraynya lali ambil target valuenya

    setForm({ ...form, keyPoint: _temp }); // set state keypoint dengan data yang baru
  };

  // handle keypoint untuk menambahkan keypoint
  const handlePlusKeyPoint = () => {
    // copy state keypoint
    let _temp = [...form.keyPoint]; // push atau tambahin data array
    _temp.push(""); // push ke state keypoint, jadi formnya nambah 1 dan isinya kosong

    setForm({ ...form, keyPoint: _temp }); // kasih spread operator untuk mengcopy state form dan tidak menghapus state yang lain
  }; // ambil keypointnya dari _temp supaya dia nambah form baru

  // handle keypoint untuk menghapus keypoint (hapus berdasarkan index)
  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1); // hapus 1 data dari index yang dipilih
    setForm({ ...form, keyPoint: _temp }); // set state keypoint dengan data yang baru
  };

  const handlePlusTicket = () => {
    let _temp = [...form.tickets];
    _temp.push({
      type: "",
      statusTicketCategories: "",
      stock: "",
      price: "",
    });

    setForm({ ...form, tickets: _temp });
  };
  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    _temp[i][e.target.name] = e.target.value;

    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <BreadCrumb
        textSecound={"Events"}
        urlSecound={"/events"}
        textThird="Create"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
        handleChangeTicket={handleChangeTicket}
      />
    </Container>
  );
}

export default EventsCreate;
