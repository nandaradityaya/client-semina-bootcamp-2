import React from "react";
import { Nav } from "react-bootstrap";

function NavLink({ role, roles, action, children }) {
  let isHas = roles.indexOf(role); // cek role yg ada di dalam array roles
  return <>{isHas >= 0 && <Nav.Link onClick={action}>{children}</Nav.Link>}</>; // jika ada atau lebih dari sama dengan 0 maka tampilkan Nav.Link
}

export default NavLink;

// ini untuk set navbar setiap role, karna beda role beda2 aksesnya
