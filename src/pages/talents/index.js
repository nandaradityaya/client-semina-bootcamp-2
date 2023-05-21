import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux"; // useSelector digunakan untuk mengambil state dari redux store, useDispatch digunakan untuk mengirim action ke redux store (jadi di pake klo ada perubahan)
import { fetchTalents, setKeyword } from "../../redux/talents/actions";
import AlertMessage from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";

function TalentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch digunakan untuk mengirim action ke redux store (jadi di pake klo ada perubahan)

  const notif = useSelector((state) => state.notif);
  const talents = useSelector((state) => state.talents); // tampilin semua yg ada di state talents

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, talents.keyword]); // akan dijalankan saat pertama kali render atau ketika dispatch berubah | jadi ini akan dijalankan ketika ada perubahan keyword atau ketika user ngetik pencarian berdasarkan keyword
  // params kedua di isi dispatch dan talents.keyword karna ini akan dirender lagi jika ada perubahan yg di lakukan oleh user (misal ngetik pencarian)

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/talents/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus speaker ${res.data.data.name}`
          )
        );

        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container className="mt-3">
      <Button action={() => navigate("/talents/create")}>Tambah</Button>
      <BreadCrumb textSecound={"Talents"} />
      <SearchInput
        name="keyword" // name ini akan di kirim ke handleChange di SearchInput, ga pake name juga ga masalah
        query={talents.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={talents.status}
        thead={["Nama", "Role", "Avatar", "Aksi"]}
        data={talents.data}
        tbody={["name", "role", "avatar"]}
        editUrl={`/talents/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default TalentsPage;
