import React from "react";
import { BrowserRouter } from "react-router-dom";
import { listen } from "./redux/listener";
import { useEffect } from "react";
import { AppRoutes } from "./routes";

function App() {
  useEffect(() => {
    listen(); // jalanin dia waktu pertama kali halaman di render | fungsi listen ini ada di src/redux/listener.js agar ketika refresh halaman, data di redux tidak hilang
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
