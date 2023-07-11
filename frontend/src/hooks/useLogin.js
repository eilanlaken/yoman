import { login } from "../redux/accountSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loginUser = (email, password) => {
    setIsLoading(true);
    setServerError("");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email, password },
      timeout: 6000, // 6 seconds
    })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        dispatch(
          login({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            jwt: response.data.jwt,
            role: response.data.role,
            gold: response.data.gold,
          })
        );
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          // response with error code
          setServerError(error.response.data.error);
        } else if (error.request) {
          // no response at all (timeout)
          setServerError(
            "This didn't work. I am working to fix it. Please come back later"
          );
        } else {
          // other trouble
          setServerError("Error sending the request", error);
        }
      });
  };

  return { loginUser, isLoading, serverError };
};

export default useLogin;
