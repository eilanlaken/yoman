import { logout } from "../redux/accountSlice";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();
  return () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };
};

export default useLogout;
