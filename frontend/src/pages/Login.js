import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import LoginSplash from "../components/LoginSplash";

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
`;

const Login = () => {
  return (
    <LoginPageContainer>
      <LoginSplash />
      <LoginForm />
    </LoginPageContainer>
  );
};

export default Login;
