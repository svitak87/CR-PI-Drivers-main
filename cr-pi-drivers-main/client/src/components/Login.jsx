import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/actions";
import { Link } from "react-router-dom";
import validate from "../assets/passwordValidation";
import style from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [access, setAccess] = useState(false);
  const [loginError, setLoginError] = useState("");

  const disebleButton = () => {
    return (
      !userCredentials.email || !userCredentials.password
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });

    const validationErrors = validate({ ...userCredentials, [name]: value });
    setErrors(validationErrors);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    if (email && password) {
      try {
        await dispatch(userLogin(userCredentials));
        setAccess(true), navigate("/home");
      } catch (error) {
        if (error.message === "Password doesn't match") {
          setAccess(false);
          setLoginError("Password doesn't match");
          setTimeout(() => {
            setUserCredentials({ email: "", password: "" });
            setLoginError("");
          }, 4000);
        } else if (error.message === "Email doesn't exist") {
          setAccess(false);
          setLoginError("Email doesn't exist");
          setTimeout(() => {
            setUserCredentials({ email: "", password: "" });
            setLoginError("");
          }, 4000);
        }
      }
    } 
  };

  return (
    <div className={style.container}>
      <h2 className={style.login}>Login</h2>
      <form onSubmit={submitForm}>
        <div className={style.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userCredentials.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
        </div>
        <div className={style.inputContainer}>
          <label className={style.password} htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userCredentials.password}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}
        </div>
        {loginError && <p className={style.loginError}>{loginError}</p>}
        <button type="submit" disabled={disebleButton()} className={style.loginButton}>Login</button>
      </form>
      <p className={style.dontHaveAccount}>¿Don't you have an account?</p>
      <Link to="/register">
        <p className={style.registerNow}>Register now!</p>
      </Link>
      <Link to="/recover">
        <p className={style.forgotPassword}>Forgot my password!</p>
      </Link>
    </div>
  );
};

export default Login;
