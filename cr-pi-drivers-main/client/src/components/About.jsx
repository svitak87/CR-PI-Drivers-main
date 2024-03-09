import React from "react";
import Navbar from "./Navbar";
import style from "./About.module.css";
import backGroundImage from "../assets/llantasFondo.jpg"

const About = () => {
  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <p className={style.primerParrafo}>
          Bienvenidos a mi aplicación{" "}
          <strong>Proyecto final: Drivers, Formula 1</strong>. Este es un
          proyecto integrador, indivifual y final; que constituye todos los
          conocimientos básicos y fundamentales para el{" "}
          <strong>Desarrollo web Frontend, Backend y Bases de Datos Full-Stack</strong>, por
          medio de una familia de librerías de <strong>JavasCript, </strong> 
          que constituyen una verdadera aplicación tipo <strong>PERN</strong>,
          acrónimo que agrupa las tecnologías de:{" "}
          <strong>Postgres, Express, React y Node.js. </strong>
          La idea de la aplicación, es que naveguen a través del mundo
          deportivo de la Formula 1 y de la misma forma, puedan crear sus
          personajes.
        </p>
        <p className={style.segundoParrafo}>
          Sobre mí, soy <strong>Óscar Fajardo</strong>, estudiante del bootcamp{" "}
          <strong>Full Stack Web Develoment</strong>, de{" "}
          <strong>soyHenry</strong>. A través de este nuevo camino que inicio en
          el mundo de la programación, esta App; Drivers, es mi primer
          proyecto y contiene todos los conocimientos que me ha brindado
          soyHenry, en su inversión en mi educación; por supuesto.
          <strong>¡Espero les guste y sean bienvenidos!</strong>
        </p>
      </div>
      <img src={backGroundImage} className={style.backGroundImage}/>
    </div>
  );
};

export default About;
