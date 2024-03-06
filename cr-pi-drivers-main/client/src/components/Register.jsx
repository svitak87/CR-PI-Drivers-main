import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validate from "../assets/passwordValidation";
import style from "./Register.module.css";
import registerImage from "../assets/fondoRegister.jpg";

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
    answerTwo: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "", name: "", lastname: "" });
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
          setUserData({...userData, password: "", passwordTwo: "" });
          setPasswordValidation("");
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
            answerTwo: "",
          });
          setRegistrationError("");
        }, 4000);
      }
    }
  };

  return (
    <div>
      <div className={style.container}>
        <h2 className={style.registerNow}>¡Register Now!</h2>
        <form onSubmit={submitForm} className={style.formFilas}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.name && <p className={style.error}>{errors.name}</p>}
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
            />
            {errors.lastname && <p className={style.error}>{errors.lastname}</p>}
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
            />
            {errors.email && <p className={style.error}>{errors.email}</p>}
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
            />
            {errors.password && (
              <p className={style.error}>{errors.password}</p>
            )}
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
            />
          </div>
          <div>
            <label htmlFor="answerOne">What's your first father name?</label>
            <input
              type="text"
              name="answerOne"
              id="answerOne"
              value={userData.answerOne}
              onChange={handleChange}
              autoComplete="off"
              
            />
          </div>
          <div>
            <label htmlFor="answerTwo">What's your birth date?</label>
            <p className={style.ifYou}>
              If your birth date is 02/feb/1990, the answer must be like:
              "02021990"
            </p>
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
          {passwordValidation && (
            <p className={style.passwordValidation}>{passwordValidation}</p>
          )}
          {registrationError && (
            <p className={style.registrationError}>{registrationError}</p>
          )}
          {successAcount && <p className={style.success}>{successAcount}</p>}
          <div>
            <button type="submit" className={style.submitButton}>
              Submit
            </button>
          </div>
        </form>
        <p className={style.alreadyRegister}>¿Already registered?</p>
        <Link to="/login">
          <p>Login clicking here!</p>
        </Link>
      </div>
      <img src={registerImage} className={style.registerImage} />
    </div>
  );
};

export default Register;
