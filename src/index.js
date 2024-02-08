import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Provider dari react-redux utk ngebungkus semua App, lalu di Provider ada store dari redux juga agar masing2 routing dapat menggunakan store global yg ada di redux */}
    {/* masing2 routing nanti jadi bisa pake store yg ada di redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
