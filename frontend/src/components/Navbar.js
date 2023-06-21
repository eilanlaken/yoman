import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth";

const Navbar = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("isloggedin", loggedIn);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h3>Devcard</h3>
        </Link>
        {loggedIn ? (
          <div>
            <span>Hello, name</span>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
