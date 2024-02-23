import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/actions";
import { Link } from "react-router-dom";
import validate from "../assets/passwordValidation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [access, setAccess] = useState(false);
  const [loginError, setLoginError] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });

    const validationErrors = validate({ ...userCredentials, [name]: value });
    setErrors(validationErrors);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    if(email && password){
      try {
        await dispatch(userLogin(userCredentials))
        setAccess(true),
        navigate('/home')
      } catch (error) {
        if(error.message === "Password doesn't match"){
          setAccess(false);
          setLoginError("Password doesn't match")
          setTimeout(() => {
            setUserCredentials({ ...userCredentials, email: "", password: "" });
            setLoginError("")
          }, 4000);
        }else if(error.message === "Email doesn't exist"){
          setAccess(false);
          setLoginError("Email doesn't exist")
          setTimeout(() => {
            setUserCredentials({ ...userCredentials, email: "", password: "" });
            setLoginError("")
          }, 4000);
        }
      }
    }else{
        setAccess(false);
        setLoginError("Email and password are required")
        setTimeout(() => {
          setUserCredentials({ ...userCredentials, email: "", password: "" });
          setLoginError("")
        }, 4000);
      }
    }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userCredentials.email}
            onChange={handleChange}
            autoComplete="off"

          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userCredentials.password}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
      <p>¿Don't you have an account?</p>
      <Link to="/register">
        <p>Register now!</p>
      </Link>
      <Link to="/recover">
        <p>Forgot my password!</p>
      </Link>
    </div>
  );
};

export default Login;