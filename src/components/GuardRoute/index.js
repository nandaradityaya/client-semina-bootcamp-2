import * as React from "react";
import { useSelector } from "react-redux"; // useSelector untuk mengambil data dari redux
import { Navigate, Outlet } from "react-router-dom";

export default function GuestOnlyRoute({ children }) {
  // klo tokennya ada tampilin childrennya
  let { token } = useSelector((state) => state.auth); // ambil tokennya dengan memanggil useSelectornya untuk panggil state auth di redux (cek auth)

  if (!token) return <Navigate to="/login" replace={true} />; // jika tidak ada token maka akan di redirect ke login

  // klo tokennya ada tampilin childrennya
  return children || <Outlet />; // wajib pake outlet karna untuk ngecek childrennya ada atau tidak, ini bawaan react router dom | childrennya itu pages yg ada di dalam tag <GuardRoute>
}
