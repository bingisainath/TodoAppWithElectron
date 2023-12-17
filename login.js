function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {};

  return (
    <div>
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
}

// Render the Login component to the 'root' div
ReactDOM.render(<Login />, document.getElementById("root"));
