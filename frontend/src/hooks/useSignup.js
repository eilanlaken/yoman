import { useState } from "react";

const useSignup = () => {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const signup = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    setServerError(null);

    // const response = await fetch(
    //   `${process.env.REACT_APP_BASE_URL}/auth/signup`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password, firstName, lastName }),
    //   }
    // );

    // const json = await response.json();

    // if (!response.ok) {
    //   setIsLoading(false);
    //   setServerError(json.error);
    // } else {
    //   setIsLoading(false);
    //   setSuccess(true);
    // }

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setServerError(null);
    }, 200);
  };

  return { signup, isLoading, serverError, success };
};

export { useSignup };
