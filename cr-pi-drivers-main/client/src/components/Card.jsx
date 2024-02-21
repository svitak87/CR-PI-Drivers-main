import React from "react";
import style from "./Card.module.css";
import defaultImage from "../assets/DefaultImage.png";
import { Link } from "react-router-dom";

const Card = ({ image, apiName, dbName, teams, source, id }) => {
  const name =
    source === "api"
      ? `${apiName.forename} ${apiName.surname}`
      : `${dbName.name} ${dbName.lastname}`;

  const newImage = image && image.startsWith("http") ? image : defaultImage;

  return (
    <div>
      <div className={style.container}>
        <div className={style.cardContainer}>
          <Link to={`/details/${id}`}>
            <div className={style.card}>
              <img src={newImage} alt={name} className={style.image} />
              <div className={style.details}>
                <h2 className={style.name}>{`Name: ${name}`}</h2>
                <p className={style.teams}>{`Teams: ${teams}`}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
