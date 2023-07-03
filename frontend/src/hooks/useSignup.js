import { useState } from "react";

const useSignup = () => {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    setServerError(null);

    const response = fetch();
  };
};
