import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  const { loggedIn, firstName, lastName, email } = useSelector(
    (state) => state.auth
  );

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
          <div>
            <span>
              Hello, {firstName} {lastName}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "130px",
            }}
          >
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
