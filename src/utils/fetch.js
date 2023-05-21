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

    return await axios.get(`${config.api_host_dev}${url}`, {
      params, // params ini adalah data yang mau dikirim ke backend atau yg di ketikan oleh user di search bar
      headers: {
        Authorization: `Bearer ${token}`, // set token ke header bearernya | ini utk cek apakah user sudah login atau belum
      },
    });
  } catch (err) {
    handleError(err);
  }
}

// postData punya url dan payload | url adalah endpointnya, payload adalah data yang mau dikirim ke backend
export async function postData(url, payload) {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${config.api_host_dev}${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function putData(url, payload) {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.put(`${config.api_host_dev}${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteData(url) {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.delete(`${config.api_host_dev}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
