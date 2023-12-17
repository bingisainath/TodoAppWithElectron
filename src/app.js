import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter as router, Routes, route } from "react-router-dom";

import configureStore from "./redux/store";

const store = configureStore();

const App = () => {
  const openLoginModal = () => {
    electron.login.openLoginWindow(); // Sending signal to main process to open a login window
  };

  useEffect(() => {
    // Listen for a successful login event from the main process
    electron.login.onLoginSuccess((args) => {
      // Handle login success, for example:
      console.log(`Login successful for user: ${args.username}`);
    });
  }, []);

  return (
    <Provider store={store}>
      <div>
        <h1>Welcome to Your App</h1>
        <button onClick={openLoginModal}>Login</button>
      </div>
    </Provider>
  );
};

export default App;
