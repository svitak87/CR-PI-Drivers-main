import React from 'react'
import Login from '../../components/Login'
import loginImage from '../../assets/loginFondo.jpg'
import style from './Landing.module.css'

const Landing = () => {
  return (
    <div>
      <Login />
      <img src={loginImage} className={style.loginImage}/>
    </div>
  )
}

export default Landing
