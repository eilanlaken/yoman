import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Legal from "./pages/Legal";

function App() {
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={loggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={loggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={loggedIn ? <Navigate to="/" /> : <SignUp />}
            />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
