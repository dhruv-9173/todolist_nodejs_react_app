import { useState } from "react";
import { handleLogin } from "../services/AuthService";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { Signin } = useAuthContext();
  const navigate = useNavigate();
  const login = (request) => {
    setLoading(true);
    try {
      handleLogin(request)
        .then((response) => {
          console.log(response);
          localStorage.setItem("user", response.data.token);
          Signin(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.error);
          setLoading(false);
        });
    } catch (error) {
      setError("Server Error");
      setLoading(false);
    }
  };

  return { errors, loading, login };
};
export default useLogin;
