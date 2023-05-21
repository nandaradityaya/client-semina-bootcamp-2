import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestOnlyRoute({ children }) {
  let { token } = useSelector((state) => state.auth); // ambil tokennya dengan memanggil useSelectornya untuk panggil state auth di redux (cek auth)

  if (token) return <Navigate to="/" replace={true} />; // jika tokennya ada maka akan di redirect ke dashboard
  return children || <Outlet />; // klo tokennya gada maka ke children atau outletnya | childrennya itu pages yg ada di dalam tag <GuestOnlyRoute>
}
