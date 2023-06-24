import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Splash from "../components/Splash";

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
`;

const Login = () => {
  return (
    <LoginPageContainer>
      <Splash page="login" />
      <LoginForm />
    </LoginPageContainer>
  );
};

export default Login;
