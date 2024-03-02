import React from 'react'
import style from './Footer.module.css'

const Footer = () => {
    return (
      <div className={style.footerContainer}>
         <small className={style.footer}>&copy; 2024 <b>Svitak87</b> - Todos los Derechos Reservados.</small>
         <a className={style.facebook} href="https://www.facebook.com/ojfajardo" target="_blank">
        </a>
        <a className={style.github} href="https://github.com/svitak87" target="_blank">
        </a>
      </div>
    )
  }
  
  export default Footer