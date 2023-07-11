import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 30vw;
  background: #f6f6f6;
  border-radius: 15%;
  padding: 20px;
  margin: 20px 40px 5px;
`;

const PrivacySettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 30vw;
  background: #f6f6f6;
  border-radius: 15%;
  padding: 20px;
  margin: 20px 40px 5px;
`;

const LinkedAccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 30vw;
  background: #f6f6f6;
  border-radius: 15%;
  padding: 20px;
  margin: 20px 40px 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1aac83;
  &:hover {
    color: #000;
  }
  &:visited {
  }
`;

const Account = () => {
  const { firstName, lastName, email, gold } = useSelector(
    (state) => state.account
  );

  return (
    <div className="account">
      <h1>Account</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <InfoContainer key={"info"}>
          <h3>Info</h3>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          {!gold && (
            <StyledLink to="/upgrade-to-gold">Upgrade to Gold</StyledLink>
          )}
        </InfoContainer>
        <PrivacySettingsContainer
          key={"privacy-settings"}
        ></PrivacySettingsContainer>
        <LinkedAccountsContainer key={"linked-accounts"}>
          three
        </LinkedAccountsContainer>
      </div>
    </div>
  );
};

export default Account;
