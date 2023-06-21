const { useState } = require("react");
const { useDispatch } = require("react-redux");

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // submit a login request to the server
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="username [your email]"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Submit</button>
    </div>
  );
};

export default Login;
