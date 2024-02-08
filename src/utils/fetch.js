import axios from "axios";
import handleError from "./handleError";
import { config } from "../configs";

// parmsnya url dan params | url adalah endpointnya, params adalah data yang mau dikirim ke backend atau yg di ketikan oleh user di search bar
export async function getData(url, params) {
  try {
    // cek tokennya dulu ada atau tidak
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const res = await axios.get(`${config.api_host_dev}${url}`, {
      params, // params ini adalah data yang mau dikirim ke backend atau yg di ketikan oleh user di search bar
      headers: {
        Authorization: `Bearer ${token}`, // set token ke header bearernya jika ada | ini utk cek apakah user sudah login atau belum
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
}

// postData punya url dan payload | url adalah endpointnya, payload adalah data yang mau dikirim ke backend
export async function postData(url, payload, formData) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const res = await axios.post(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json", // multipart/form-data ini utk upload image | application/json ini utk selain upload image
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
}

export async function putData(url, payload) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const res = await axios.put(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteData(url) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const res = await axios.delete(`${config.api_host_dev}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    return handleError(err);
  }
}
