// Login.js
import React, { useState, useEffect } from "react";

const Login = () => {
  console.log("Login SCenn");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const { ipcRenderer } = window.require("electron");

    const handleLoginResult = (event, result) => {
      console.log("Login Result:", result);
      // Handle login result as needed
      // For example, if result === 'success', redirect to another page
    };

    ipcRenderer.on("loginResult", handleLoginResult);

    return () => {
      ipcRenderer.removeListener("loginResult", handleLoginResult);
    };
  }, []);

  const handleLogin = () => {
    const { ipcRenderer } = window.require("electron");
    ipcRenderer.send("attemptLogin", { username, password });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
