import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "../redux/actions";
import { Link } from "react-router-dom";
import validate from "../assets/passwordValidation";
import imageBackground from "../assets/casco.jpg";
import style from "./Forgotpassword.module.css";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [acces, setAcces] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [updateRecover, setUpdateRecover] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    answerOne: "",
    answerTwo: "",
  });

  const disableButton = () => {
    return (
      !userCredentials.email ||
      !userCredentials.password ||
      !userCredentials.answerOne ||
      !userCredentials.answerTwo
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

    const { email, answerOne, answerTwo, password } = userCredentials;

    if (email && answerOne && answerTwo && password) {
      try {
        await dispatch(recoverPassword(userCredentials));
        setAcces(true);
        navigate("/login");
      } catch (error) {
        if (error.message === "Email doesn't exist") {
          setAcces(false);
          setUpdateRecover("Email doesn't exist");
          setTimeout(() => {
            setUserCredentials({
              email: "",
              password: "",
              answerOne: "",
              answerTwo: "",
            });
            setUpdateRecover("");
          }, 4000);
        }
        if (error.message === "Incorrect answers") {
          setAcces(false);
          setUpdateRecover("Incorrect answers");
          setTimeout(() => {
            setUserCredentials({
              email: "",
              password: "",
              answerOne: "",
              answerTwo: "",
            });
            setUpdateRecover("");
          }, 4000);
        }
      }
    } else {
      setAcces(false);
      setUpdateRecover("Incomplete data provided");
      setTimeout(() => {
        setUserCredentials({
          email: "",
          password: "",
          answerOne: "",
          answerTwo: "",
        });
        setUpdateRecover("");
      }, 4000);
    }
  };
  return (
    <div>
      <div className={style.container}>
        <h2 className={style.recoverPassword}>Recover your password</h2>
        <form onSubmit={submitForm}>
          <label>Please enter your email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userCredentials.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
          <label>What's your first father's name? 'lowercase format'</label>
          <input
            type="text"
            name="answerOne"
            id="answerOne"
            value={userCredentials.answerOne}
            onChange={handleChange}
            autoComplete="off"
          />
          <label>What's your birth date?</label>
          <p className={style.ifYou}>
            If your birth date is 02/feb/1990, the answer must be like:
            "02021990"
          </p>
          <input
            type="text"
            name="answerTwo"
            id="answerTwo"
            value={userCredentials.answerTwo}
            onChange={handleChange}
            autoComplete="off"
          />
          <div>
            <label htmlFor="newpassword">New password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userCredentials.password}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.password && (
              <p className={style.error}>{errors.password}</p>
            )}
          </div>
          {updateRecover && (
            <p className={style.updateRecover}>{updateRecover}</p>
          )}
          <div>
            <button
              type="submit"
              className={style.submitButton}
              disabled={disableButton()}
            >
              Submit
            </button>
          </div>
        </form>
        <div>
          <p className={style.iRemember}>¡I remember my password!</p>
          <Link to="/login">
            <p className={style.login}>Go back to login</p>
          </Link>
        </div>
      </div>
      <img src={imageBackground} className={style.imageBackground} />
    </div>
  );
};

export default Forgotpassword;
