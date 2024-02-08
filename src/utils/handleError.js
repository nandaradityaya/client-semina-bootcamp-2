import axios from "axios";
import { config } from "../configs";

const handleError = (error) => {
  const originalRequest = error.config;
  if (error.response.data.msg === "jwt expired") {
    originalRequest._retry = true; // tujuan dari ini adalah untuk ngecek apakah requestnya udah di retry atau belum, klo belum di retry, maka akan di retry lagi, klo udah di retry, maka akan di redirect ke login (ini buat refresh token)
    // ambil local storage tujuannya agar kita dapetin refresh token yg kita simpan di dalam local storage, lalu simpan di query params di bawah
    const session = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return axios
      .get(`${config.api_host_dev}/cms/refresh-token/${session.refreshToken}`)
      .then((res) => {
        console.log("res");
        console.log(res);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...session,
            token: res.data.data.token,
          })
        ); // kasih token baru ke local storage
        originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`; // kasih token baru ke header

        console.log("originalRequest");
        console.log(originalRequest);

        return axios(originalRequest);
      })
      .catch((err) => {
        window.location.href = "/login";
        localStorage.removeItem("auth");
      });
  }

  return error;
};

export default handleError;
