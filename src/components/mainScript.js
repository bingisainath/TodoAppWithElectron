import React from "https://unpkg.com/react@17/umd/react.development.js";
import ReactDOM from "https://unpkg.com/react-dom@17/umd/react-dom.development.js";
import Login from "./loginForm.js"; // Replace with your bundled React code path

window.onload = function () {
  ReactDOM.render(
    React.createElement(Login.default),
    document.getElementById("login-root")
  );
};
