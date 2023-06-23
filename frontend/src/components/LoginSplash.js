import styled from "styled-components";
import { Link } from "react-router-dom";

const primaryColor = "#1aac83";

const LoginSplashContainer = styled.div`
  padding: 20px 40px;
`;

const Logo = styled.h1`
  color: ${primaryColor};
  font-size: 3em;
`;

const Tagline = styled.p`
  color: ${(props) => props.color || "#333"};
  font-size: ${(props) => props.fontSize || "1.5em"};
  margin: 0.5em 0; // add some vertical spacing
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpPrompt = styled.p`
  color: #777;
  font-size: 1.2em;
`;

const SignUpLink = styled(Link)`
  color: ${primaryColor};
  margin-left: 20px;
  font-size: 1.2em;
`;

const LoginSplash = () => {
  return (
    <LoginSplashContainer>
      <Logo>Devcard</Logo>
      <Tagline color="#333" fontSize="1.5em">
        Welcome back
      </Tagline>
      <SignUpContainer>
        <SignUpPrompt>Don't have an account?</SignUpPrompt>
        <SignUpLink to="/signup">Sign Up</SignUpLink>
      </SignUpContainer>
    </LoginSplashContainer>
  );
};

export default LoginSplash;
