import styled from "styled-components";
import { Link } from "react-router-dom";

const primaryColor = "#1aac83";

const SplashContainer = styled.div`
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

const SignUpPromptContainer = styled.div`
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

const Splash = ({ page }) => {
  return (
    <SplashContainer>
      <Logo>Devcard</Logo>
      <Tagline color="#333" fontSize="1.1em">
        Replace Your Resume Files With A Link.
      </Tagline>
      {(page === "login" || page === "forgot-password") && (
        <SignUpPromptContainer>
          <SignUpPrompt>Don't have an account?</SignUpPrompt>
          <SignUpLink to="/signup">Sign Up</SignUpLink>
        </SignUpPromptContainer>
      )}
      {page === "signup" && (
        <LoginPromtContainer>
          <LoginPrompt>Already have an account?</LoginPrompt>
          <LoginLink to="/login">Login</LoginLink>
        </LoginPromtContainer>
      )}
    </SplashContainer>
  );
};

export default Splash;
