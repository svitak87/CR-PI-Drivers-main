import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "../redux/actions";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateRecover, setUpdateRecover] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    newpassword: "",
    answerOne: "",
    answerTwo: "",
  });
  const users = useSelector((state) => state.users);
  console.log(users)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const { email, answerOne, answerTwo, newpassword } = userCredentials;

    if (currentUser && currentUser.answerOne === answerOne && currentUser.answerTwo === answerTwo) {
      if (newpassword) {
        try {
          await dispatch(recoverPassword(userCredentials));
          setUpdateRecover("");
          navigate("/login");
        } catch (error) {
          if (error.message === "Incorrect credentials, verify your answers") {
            setUpdateRecover("Incorrect credentials, verify your answers");
            setTimeout(() => {
              setUserCredentials({
                email: "",
                newpassword: "",
                answerOne: "",
                answerTwo: "",
              });
            }, 4000);
            setTimeout(() => {
              setUpdateRecover("");
            }, 4000);
          }
        }
      }
    }
  };

  return (
    <div>
      <h2>Please enter your email:</h2>
      <form onSubmit={submitForm}>
        <input
          type="email"
          name="email"
          id="email"
          value={userCredentials.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <h2>What's your first father's name?</h2>
        <input
          type="text"
          name="answerOne"
          id="answerOne"
          value={userCredentials.answerOne}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <h2>What's your birth date?</h2>
        <p>If your birth date is 02/feb/1990, the answer must be like: "02021990"</p>
        <input
          type="text"
          name="answerTwo"
          id="answerTwo"
          value={userCredentials.answerTwo}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <div>
          <label htmlFor="newpassword">New password:</label>
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            value={userCredentials.newpassword}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {updateRecover && <p>{updateRecover}</p>}
    </div>
  );
};

export default Forgotpassword;
