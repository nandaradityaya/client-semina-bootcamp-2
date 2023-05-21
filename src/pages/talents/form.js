import React from "react";
import { Figure, Form } from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { config } from "../../configs";

export default function SpeakersForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukan nama pembicara"}
        label={"Nama"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan role"}
        label={"Role"}
        name="role"
        value={form.role}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Avatar"}
        label={"Avatar"}
        name="avatar" // name harus sama dengan state
        // value={form.avatar}
        type="file"
        onChange={handleChange}
      />
      {/* jika form avatar name nya tidak sama dengan kosong maka munculin imagenya | ini dapet dari setForm di create.js */}
      {form.avatar !== "" && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={`${config.api_image}/${form.avatar}`} // avatar dapat dari setForm di create.js
            />

            <Figure.Caption>Perview image avatar</Figure.Caption>
          </Figure>
        </div>
      )}
      {/* liat props edit atau ngga, klo ga kirim edit berarti buttonnya simpan */}
      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </Button>
    </Form>
  );
}
