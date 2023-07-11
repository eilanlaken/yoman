import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineFeedback } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  cursor: pointer;
`;

const HamburgerIcon = styled(AiOutlineMenu)`
  color: black;
  &:hover {
    color: #1aac83;
  }
`;

const Menu = styled.div`
  display: flex;
  right: 0;
  flex-direction: column;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  width: 280px;
`;

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border-radius: 5px;
  cursor: pointer;
  padding: 2px 6px;
  background-color: ${(props) => props.backgroundColor || "none"};
  &:hover {
    background-color: #1aac83;
  }
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

const HamburgerMenu = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { gold } = useSelector((state) => state.account);
  const node = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (node.current && !node.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={node} style={{ position: "relative" }}>
      <HamburgerIcon onClick={toggleMenu} />
      {isOpen && (
        <Menu>
          <MenuItemContainer
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
          >
            <AiOutlineHome style={{ marginRight: "20px" }} />
            Home
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => {
              navigate("/account");
              closeMenu();
            }}
          >
            <MdOutlineAccountCircle style={{ marginRight: "20px" }} />
            Account
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => {
              navigate("/give-feedback");
              closeMenu();
            }}
          >
            <MdOutlineFeedback style={{ marginRight: "20px" }} />
            Give Feedback
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => {
              navigate("/legal");
              closeMenu();
            }}
          >
            <MdOutlinePolicy style={{ marginRight: "20px" }} />
            Privacy Policy
          </MenuItemContainer>
          {!gold && (
            <MenuItemContainer
              backgroundColor="gold"
              onClick={() => {
                navigate("/upgrade-to-gold");
                closeMenu();
              }}
            >
              <BsEmojiSmile style={{ marginRight: "20px" }} />
              Upgrade to Gold
            </MenuItemContainer>
          )}
          <MenuItemContainer
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
          >
            <RiLogoutBoxLine style={{ marginRight: "20px" }} />
            Logout
          </MenuItemContainer>
        </Menu>
      )}
    </div>
  );
};

const Navbar = () => {
  const logout = useLogout();
  const { loggedIn, firstName } = useSelector((state) => state.account);

  const handleLogout = async () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <StyledLink to="/">
          <h2>Devcard</h2>
        </StyledLink>
        {loggedIn ? (
          <Container>
            <span>Hello {firstName}!</span>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <HamburgerMenu handleLogout={handleLogout} />
          </Container>
        ) : (
          <Container>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Sign Up</StyledLink>
          </Container>
        )}
      </div>
    </header>
  );
};

export default Navbar;
