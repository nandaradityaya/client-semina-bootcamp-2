import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const [number, setNumber] = useState(0);
  // const [name, setName] = useState(""); // ini untuk input data diri (nama)
  // const [tahunLahir, setTahunLahir] = useState(""); // ini untuk input data diri (usia)
  // const [usia, setUsia] = useState(""); // ini untuk input data diri (usia)

  const [form, setForm] = useState({
    name: "",
    age: "",
    tahunLahir: "",
  }); // ini use state untuk input data diri (nama, usia, tahun lahir), karena banyak jadi biar ga use state satu satu makanya pake object spt ini

  const [error, setError] = useState("");

  const klik = () => {
    setNumber(number + 1); // ini sama aja seperti number = number + 1
    console.log(number);
  };

  const handleSubmit = () => {
    if (form.name === "") {
      setError("nama tidak boleh kosong");
    } else if (form.tahunLahir === "") {
      setError("tanggal tidak boleh kosong");
    } else {
      setForm({ ...form, age: 2023 - form.tahunLahir }); // pake spread operator biar ga nge overwrite data yang lain
    }
  };

  const handleChange = (e) => {
    setError("");
    if (e.target.name === "name") {
      if (e.target.value.length < 3) {
        setError("minimal 3 karakter");
      }
    }
    setForm({ ...form, [e.target.name]: e.target.value }); // pake spread operator biar ga nge overwrite data yang lain. Target name itu nama dari inputnya, jadi kalo input name, maka target name nya name, kalo input tahun lahir, maka target name nya tahunLahir. Target value itu value dari inputnya, jadi kalo input name, maka target value nya value dari input name, kalo input tahun lahir, maka target value nya value dari input tahun lahir
  };

  return (
    <>
      <h1>Counter App</h1>
      <p>Nilai counter saat ini {number}</p>
      <Button onClick={klik}>Click me</Button>
      <hr></hr>
      <h1>Aplikasi input data diri</h1>
      name :{" "}
      <Input
        type="text"
        value={form.name}
        name="name"
        handleChange={handleChange}
      />
      <br></br>
      <br></br>
      tahun lahir :{" "}
      <Input
        type="number"
        value={form.tahunLahir}
        name="tahunLahir"
        handleChange={handleChange}
      />
      <br></br>
      Umur saya : {form.age}
      <br></br>
      <Button onClick={handleSubmit}>Submit</Button>
      <br></br>
      <p style={{ color: "red" }}>{error}</p>
    </>
  );
}

export default App;
