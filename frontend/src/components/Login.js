import { Link } from "react-router-dom";
import { login } from "../redux/auth";

const { useState } = require("react");
const { useDispatch } = require("react-redux");

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    // submit a login request to the server

    // dummy code
    e.preventDefault();
    const credentials = { email: username, password };
    dispatch(login(credentials));
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
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
