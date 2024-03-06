import React from "react";
import style from "./Card.module.css";
import defaultImage from "../assets/DefaultImage.png";
import { Link } from "react-router-dom";

const Card = ({id, name, lastname, image, teams}) => {
  const newImage = image && image.startsWith("http") ? image : defaultImage;

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
          <div className={style.card}>
          <Link to={`/details/${id}`}>
            <img src={newImage} alt={name} className={style.image} />
            <div className={style.details}>
              <p className={style.name}><strong>Name: </strong><span>{name} {lastname}</span></p>
              <p className={style.teams}><strong>Teams: </strong><span>{teams}</span></p>
            </div>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Card;

