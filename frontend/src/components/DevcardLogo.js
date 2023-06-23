import styled from "styled-components";

const primaryColor = "#1aac83";

const Logo = styled.h1`
  color: ${primaryColor};
  font-size: 2em;
`;

const Tagline = styled.p`
  color: ${(props) => props.color || "#333"};
  font-size: ${(props) => props.fontSize || "1em"};
  margin: 0.5em 0; // add some vertical spacing
`;

const DevcardLogo = () => {
  return (
    <div>
      <Logo>Devcard</Logo>
      <Tagline color="#333" fontSize="1.2em">
        Create your software developer portfolio
      </Tagline>
      <Tagline color="#555" fontSize="1.1em">
        Form connections and collaborate
      </Tagline>
      <Tagline color="#777" fontSize="1em">
        Be discovered by other developers
      </Tagline>
    </div>
  );
};

export default DevcardLogo;
