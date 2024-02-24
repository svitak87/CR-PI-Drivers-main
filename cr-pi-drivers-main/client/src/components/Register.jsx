import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validate from "../assets/passwordValidation";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordTwo: "",
    answerOne: "",
    answerTwo: ""
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [passwordValidation, setPasswordValidation] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [successAcount, setSuccesAcount] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });

    const validationErrors = validate({ ...userData, [name]: value });
    setErrors(validationErrors);
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      if (userData.password === userData.passwordTwo) {
        await dispatch(registerUser(userData));
        setSuccesAcount("Congratulations now you have an account");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        setPasswordValidation("Passwords do not match");
        setTimeout(() => {
          setUserData({ ...userData, password: "", passwordTwo: "" });
          setPasswordValidation("")
        }, 3000);
      }
    } catch (error) {
      if (error.message === "User already exists") {
        setRegistrationError("User already exists");
        setTimeout(() => {
          setUserData({
            name: "",
            lastname: "",
            email: "",
            password: "",
            passwordTwo: "",
            answerOne: "",
            answerTwo: ""
          });
          setRegistrationError("")
        }, 4000);
      }
    }
  };
  

  return (
    <div>
      <h2>Register Now!</h2>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={userData.lastname}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            name="passwordTwo"
            id="passwordTwo"
            value={userData.passwordTwo}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="answerOne">What's your father first name?</label>
          <input
            type="text"
            name="answerOne"
            id="answerOne"
            value={userData.answerOne}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="answerTwo">What's your birth date?</label>
          <p>If your birth date is 02/feb/1990, the answer must be like: "02021990"</p>
          <input
            type="text"
            name="answerTwo"
            id="answerTwo"
            value={userData.answerTwo}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        {passwordValidation && <p>{passwordValidation}</p>}
        {registrationError && <p>{registrationError}</p>}
        {successAcount && <p>{successAcount}</p>}
      </form>
      <p>¿Already registered?</p>
      <Link to="/login">
        <p>Login clicking here!</p>
      </Link>
    </div>
  );
};

export default Register;