import styled from "styled-components";
import { Link } from "react-router-dom";

const primaryColor = "#1aac83";

const SignUpSplashContainer = styled.div`
  padding: 20px 40px;
`;

const Logo = styled.h1`
  color: ${primaryColor};
  font-size: 3em;
`;

const Tagline = styled.p`
  color: ${(props) => props.color || "#333"};
  font-size: ${(props) => props.fontSize || "1.5em"};
  margin: 0.5em 0; // add some vertical spacing;
  background-color: ${(props) => props.backgroundColor || "#f1f1f1"};
`;

const LoginPromtContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LoginPrompt = styled.p`
  color: #777;
  font-size: 1.2em;
`;

const LoginLink = styled(Link)`
  color: ${primaryColor};
  margin-left: 20px;
  font-size: 1.2em;
`;

const SignUpSplash = () => {
  return (
    <SignUpSplashContainer>
      <Logo>Devcard</Logo>
      <Tagline color="#333" fontSize="1.1em">
        Create a software developer portfolio
      </Tagline>
      <Tagline color="#333" fontSize="1.1em">
        Connect and collaborate with others
      </Tagline>
      <Tagline color="#333" fontSize="1.1em">
        Get discovered by employers
      </Tagline>
      <LoginPromtContainer>
        <LoginPrompt>Already have an account?</LoginPrompt>
        <LoginLink to="/login">Login</LoginLink>
      </LoginPromtContainer>
    </SignUpSplashContainer>
  );
};

export default SignUpSplash;
