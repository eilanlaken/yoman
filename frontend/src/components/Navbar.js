import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineFeedback } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
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

const HamburgerMenu = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [premiumUser, setPremuimUser] = useState(false);
  const node = useRef();

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
          <MenuItemContainer onClick={() => console.log("hi")}>
            <MdOutlineAccountCircle style={{ marginRight: "20px" }} />
            Account
          </MenuItemContainer>
          <MenuItemContainer onClick={() => console.log("hi")}>
            <MdOutlineFeedback style={{ marginRight: "20px" }} />
            Give Feedback
          </MenuItemContainer>
          <MenuItemContainer>
            <MdOutlinePolicy style={{ marginRight: "20px" }} />
            <Link to="/legal" onClick={closeMenu}>
              Privacy Policy
            </Link>
          </MenuItemContainer>
          {!premiumUser && (
            <MenuItemContainer
              backgroundColor="gold"
              onClick={() => console.log("hi")}
            >
              <BsEmojiSmile style={{ marginRight: "20px" }} />
              Upgrade to Gold
            </MenuItemContainer>
          )}
          <MenuItemContainer onClick={() => console.log("hi")}>
            <RiLogoutBoxLine style={{ marginRight: "20px" }} />
            <Link
              to="/login"
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
            >
              Logout
            </Link>
          </MenuItemContainer>
        </Menu>
      )}
    </div>
  );
};

const Navbar = () => {
  const logout = useLogout();
  const { loggedIn, firstName } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Devcard</h2>
        </Link>
        {loggedIn ? (
          <Container>
            <span>Hello {firstName}!</span>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <HamburgerMenu handleLogout={handleLogout} />
          </Container>
        ) : (
          <Container>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </Container>
        )}
      </div>
    </header>
  );
};

export default Navbar;
