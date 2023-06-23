import styled from "styled-components";
import SignUpForm from "../components/SignUpForm";
import SignUpSplash from "../components/SignUpSplash";

const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
`;

const SignUp = () => {
  return (
    <SignUpPageContainer>
      <SignUpSplash />
      <SignUpForm />
    </SignUpPageContainer>
  );
};

export default SignUp;
