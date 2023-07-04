import { Link } from "react-router-dom";
import { login } from "../redux/authSlice_old";
import styled from "styled-components";

const { useState } = require("react");
const { useDispatch } = require("react-redux");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 30vw;
  background: #f6f6f6;
  border-radius: 15%;
  padding: 20px;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 200px;
  border: none;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  width: 200px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = ({ withUsername, withPassword, withMessage }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(withUsername);
  const [password, setPassword] = useState(withPassword);

  const handleLogin = (e) => {
    // submit a login request to the server

    // dummy code
    e.preventDefault();
    const credentials = { email: username, password };
    dispatch(login(credentials));
  };

  return (
    <Container>
      {withMessage && <p>{withMessage}</p>}
      <h2>Login</h2>
      <StyledInput
        type="text"
        placeholder="username [your email]"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton onClick={handleLogin}>Submit</StyledButton>
      <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
    </Container>
  );
};

export default LoginForm;
