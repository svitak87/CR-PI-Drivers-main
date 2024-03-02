import React from "react";
import style from "./Card.module.css";
import defaultImage from "../assets/DefaultImage.png";
import { Link } from "react-router-dom";

const Card = ({id, name, lastname, image, teams}) => {
  const newImage = image && image.startsWith("http") ? image : defaultImage;

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        <Link to={`/details/${id}`}>
          <div className={style.card}>
            <img src={newImage} alt={name} className={style.image} />
            <div className={style.details}>
              <h2 className={style.name}>{`Name: ${name} ${lastname}`}</h2>
              <p className={style.teams}>{`Teams: ${teams}`}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;

