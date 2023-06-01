import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Image, Spinner } from "react-bootstrap";
import moment from "moment";
import { config } from "../../configs";

function TbodyWithAction({
  data,
  display,
  editUrl,
  deleteAction,
  customAction,
  actionNotDisplay, // pake ini jika tidak ingin menampilkan action
  status,
}) {
  const navigate = useNavigate();
  return (
    <tbody>
      {status === "process" ? (
        // klo statusnya yg di redux masih process maka munculin spinner loading dulu
        <tr>
          {/*  display.length + 1 karena ada tambahan 1 kolom untuk action, jadi biar spinnernya di tengah table */}
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            <div className="flex items-center justify-center">
              <Spinner animation="border" variant="primary" />
            </div>
          </td>
        </tr>
      ) : data.length ? (
        data.map((data, index) => {
          return (
            <tr key={index}>
              {/* looping Objectnya karna datanya object, lalu cek keynya yaitu id dan nama yg ada di API */}
              {Object.keys(data).map(
                (key) =>
                  // Looping display yg di map berdasarkan key yg ada di object
                  display.indexOf(key) > -1 && (
                    <td key={key}>
                      {/* klo keynya === avatar maka munculin juga gambarnya */}
                      {key === "avatar" ? (
                        // key === avatar maka munculin gambar | ini yg di manipulasi di action talents supaya bisa munculin gambar, jadi keynya di manipulasi di action talents
                        <Image
                          height={40}
                          width={40}
                          roundedCircle
                          src={`${config.api_image}/${data[key]}`}
                        />
                      ) : key === "date" ? (
                        // klo keynya === date maka formatnya pake moment
                        moment(data[key]).format("DD-MM-YYYY, h:mm:ss a")
                      ) : (
                        data[key] // klo bukan avatar dan date maka tampilkan data[key] (value dari objectnya mentah)
                      )}
                    </td>
                  )
              )}
              {!actionNotDisplay && (
                <td>
                  {/* customAction ini di pake untuk edit status event, jadi dia ambil data statusEventnya aja | kirim data id dan status ke index pages events */}
                  {customAction && customAction(data._id, data.statusEvent)}
                  {editUrl && (
                    <Button
                      variant="success"
                      size={"sm"}
                      action={() => navigate(`${editUrl}/${data._id}`)} // kirim id ke editUrl yg ada di halaman yg memakai component ini, idnya berdasarkan id yg ada di API | navigate dari ke halaman edit dan id kategorinya
                    >
                      Edit
                    </Button>
                  )}
                  {deleteAction && (
                    <Button
                      className={"mx-2"}
                      variant="danger"
                      size={"sm"}
                      action={() => deleteAction(data._id)} // kirim id ke deleteAction yg ada di halaman yg memakai component ini, idnya berdasarkan id yg ada di API
                    >
                      Hapus
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TbodyWithAction;
