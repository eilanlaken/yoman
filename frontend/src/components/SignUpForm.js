import styled from "styled-components";
import validator from "validator";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import ClipLoader from "react-spinners/ClipLoader";
import LoginForm from "./LoginForm";
const passwordValidator = require("password-validator");
const { useState } = require("react");
const { useDispatch } = require("react-redux");

const primaryColor = "#1aac83";

const SignUpFormContainer = styled.div`
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
  margin-bottom: 1px;
  padding: 10px;
  width: 250px;
  border: none;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  width: 250px;
  font-size: 12px;
`;

const TermsAndConditionsClause = styled.div`
  display: flex;
  align-items: left;
  width: 250px;
  margin-bottom: 10px;
`;

const TermsText = styled.p`
  color: #777;
  font-size: 12px;
  margin-top: 5;
  margin-bottom: 0;
`;

const TermsLink = styled(Link)`
  color: ${primaryColor};
  font-size: 12px;
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

const schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(26)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces()
  .has()
  .symbols(1);

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const { signup, isLoading, serverError, success } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    resetErrors();
    if (!validate()) {
      return;
    }

    await signup(email, password, firstName, lastName);
  };

  const resetErrors = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setPasswordRepeatError("");
  };

  const validate = () => {
    const validFirstName = validateFirstName();
    const validLastName = validateLastName();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    const validPasswordRepeat = validatePasswordRepeat();
    if (
      !validFirstName ||
      !validLastName ||
      !validEmail ||
      !validPassword ||
      !validPasswordRepeat
    )
      return false;
    return true;
  };

  const validateFirstName = () => {
    if (firstName.trim() === "") {
      setFirstNameError("First name must be filled");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError("First name must contain letters only");
      return false;
    }
    return true;
  };

  const validateLastName = () => {
    if (lastName.trim() === "") {
      setLastNameError("Last name must be filled");
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError("Last name must contain letters only");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!validator.isEmail(email)) {
      setEmailError("Not a valid email address");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!schema.validate(password)) {
      setPasswordError(
        "Password must contain: at least 1 uppercase, at least 1 lowercase, at least 1 symbol, at least 1 digit and be between 8 and 26 characters long."
      );
      return false;
    }
    return true;
  };

  const validatePasswordRepeat = () => {
    if (password !== passwordRepeat) {
      setPasswordRepeatError(
        "Passwords do not match. Please ensure both passwords are identical."
      );
      return false;
    }
    return true;
  };

  return !success ? (
    <SignUpFormContainer>
      <h2>Sign Up</h2>
      <StyledInput
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {firstNameError && <ErrorMessage>*{firstNameError}</ErrorMessage>}
      <StyledInput
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {lastNameError && <ErrorMessage>*{lastNameError}</ErrorMessage>}
      <StyledInput
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <ErrorMessage>*{emailError}</ErrorMessage>}
      <StyledInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <ErrorMessage>*{passwordError}</ErrorMessage>}
      <StyledInput
        type="password"
        placeholder="Repeat password"
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />
      {passwordRepeatError && (
        <ErrorMessage>*{passwordRepeatError}</ErrorMessage>
      )}
      <TermsAndConditionsClause>
        <TermsText>
          By clicking Submit, you agree to our{" "}
          <TermsLink to="/legal">terms and conditions</TermsLink>
        </TermsText>
      </TermsAndConditionsClause>
      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
      <StyledButton onClick={handleSignup} disabled={isLoading}>
        {isLoading ? (
          <ClipLoader color="white" loading={true} size={15} />
        ) : (
          "Submit"
        )}
      </StyledButton>
    </SignUpFormContainer>
  ) : (
    <div>
      <p></p>
      <LoginForm
        withUsername={email}
        withPassword={password}
        withMessage={
          "Success! Please veify your email by clicking on the link we just sent before logging in."
        }
      />
    </div>
  );
};

export default SignUpForm;
