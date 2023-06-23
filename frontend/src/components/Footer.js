import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px; /* Adjust as needed */
  background-color: #f5f5f5; /* Adjust color as needed */
`;

const Copyright = styled.p`
  color: #333; /* Adjust color as needed */
  font-size: 0.8em; /* Adjust size as needed */
`;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <Copyright>© {year} Devcard. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
