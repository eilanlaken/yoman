import { useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const signup = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    setServerError(null);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/auth/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email, password, firstName, lastName },
      timeout: 6000, // 6 seconds
    })
      .then((response) => {
        setIsLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setSuccess(false);
        if (error.response) {
          // response with error code
          setServerError(error.response.data.error);
        } else if (error.request) {
          // no response at all
          setServerError(
            "This didn't work. I am working to fix it. Please come back later"
          );
        } else {
          // other trouble
          setServerError("Error sending the request.");
        }
      });
  };

  return { signup, isLoading, serverError, success };
};

export { useSignup };
