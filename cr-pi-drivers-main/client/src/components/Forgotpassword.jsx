import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "../redux/actions";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [acces, setAcces] = useState(false)
  const [updateRecover, setUpdateRecover] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    answerOne: "",
    answerTwo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const { email, answerOne, answerTwo, password} = userCredentials;

    if (email && answerOne && answerTwo && password) {
      try {
        await dispatch(recoverPassword(userCredentials));
        setAcces(true)
        navigate("/login");
      } catch (error) {
        if(error.message === "Email doesn't exist"){
          setAcces(false)
          setUpdateRecover("Email doesn't exist");
          setTimeout(() => {
            setUserCredentials({
              email: "",
              password: "",
              answerOne: "",
              answerTwo: "",
            })
            setUpdateRecover("")
          }, 4000);}
          if(error.message === "Incorrect answers"){
            setAcces(false)
            setUpdateRecover("Incorrect answers");
            setTimeout(() => {
              setUserCredentials({
                email: "",
                password: "",
                answerOne: "",
                answerTwo: "",
              })
              setUpdateRecover("")
            }, 4000);
          }
        }
      }else{
        setAcces(false)
        setUpdateRecover("Incomplete data provided");
        setTimeout(() => {
          setUserCredentials({
            email: "",
            password: "",
            answerOne: "",
            answerTwo: "",
          })
          setUpdateRecover("")
        }, 4000);
      }
    }


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
          
        />
        <h2>What's your first father's name?</h2>
        <input
          type="text"
          name="answerOne"
          id="answerOne"
          value={userCredentials.answerOne}
          onChange={handleChange}
          autoComplete="off"
          
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
