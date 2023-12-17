// SplashScreen.js
import React from 'react';

const SplashScreen = ({ onLoginClick }) => {
  return (
    <div className="splash-screen">
      <h1>Splash Screen</h1>
      <button onClick={onLoginClick}>Login</button>
    </div>
  );
};

export default SplashScreen;
