import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SBreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories/actions";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif); // ambil state notif dari redux store | state awalnya false
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]); // akan dijalankan saat pertama kali render atau ketika dispatch berubah

  const handleDelete = (id) => {
    // library sweetalert2
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
        const res = await deleteData(`/cms/categories/${id}`);
        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus kategori ${res.data.data.name}`
          )
        );
        dispatch(fetchCategories());
      }
    });
  };

  return (
    <Container className="mt-3">
      <SBreadCrumb textSecound={"Categories"} />

      <Button className={"mb-3"} action={() => navigate("/categories/create")}>
        Tambah
      </Button>

      {/* cek notifnya true atau false, klo true dia tampilin alert notifnya */}
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={categories.status} // statuss dari redux reducer (proses, sukses, gagal)
        thead={["Nama", "Aksi"]} // theadnya nama dan aksi
        data={categories.data} // data dari redux, ambilnya dari API
        tbody={["name"]} // tbody yg di tampilkan di table (namanya harus sama dengan yg di API, di API saya pakenya name)
        editUrl={`/categories/edit`} // editUrl ini untuk mengarahkan ke halaman edit, id nya diambil dari data._id di table
        deleteAction={(id) => handleDelete(id)} // deleteAction ini untuk menghapus data, id nya diambil dari data._id di table
        withoutPagination
      />
    </Container>
  );
}

export default Categories;
