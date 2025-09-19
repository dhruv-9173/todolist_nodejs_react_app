import { useState } from "react";
import { handleRegister } from "../services/AuthService";

const useRegister = () => {
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const register = (request) => {
    setLoading(true);
    try {
      handleRegister(request)
        .then((response) => {
          setError("");
          setSuccess(response.data.message + ".Please Login to continue");
        })
        .catch((error) => {
          console.log(error);
          setSuccess("");
          setError(error.response.date.error);
        });
    } catch (error) {
      setError("Server Error");
    }
    setLoading(false);
  };
  return { errors, loading, success, register };
};
export default useRegister;
