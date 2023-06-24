import styled from "styled-components";
import SignUpForm from "../components/SignUpForm";
import Splash from "../components/Splash";

const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
`;

const SignUp = () => {
  return (
    <SignUpPageContainer>
      <Splash page="signup" />
      <SignUpForm />
    </SignUpPageContainer>
  );
};

export default SignUp;
