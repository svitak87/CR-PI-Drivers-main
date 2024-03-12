import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDriverDetail } from "../../redux/actions";
import defaultImage from "../../assets/DefaultImage.png";
import Navbar from "../../components/Navbar";
import style from "../Details/Details.module.css";
import pistaImage from "../../assets/pistaDetalles.jpg"

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const driver = useSelector((state) => state.drivers);

  const newImage =
    driver.image && driver.image.startsWith("http")
      ? driver.image
      : defaultImage;

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getDriverDetail(id));
      } catch (error) {
        throw error;
      }
    };

    getData();
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <div className={style.imageContainter}>
          <img src={newImage} alt={driver.name} />
        </div>
        <div className={style.infoContainer}>
          <p><strong>Name:</strong> <span>{driver.name}</span></p>
          <p><strong>Lastname:</strong> <span>{driver.lastname}</span></p>
          <p><strong>ID:</strong> <span>{driver.id}</span></p>
          <p><strong>Nationality:</strong> <span>{driver.nationality}</span></p>
          <p><strong>Description:</strong> <span>{driver.description}</span></p>
          <p><strong>Date of birth:</strong> <span>{driver.dob}</span></p>
          <p><strong>Teams:</strong></p>
          {Array.isArray(driver.teams) && driver.teams.length > 0 ? (
            <ul>
              {driver.teams.map((team, index) => (
                <li key={index}>{team.name}</li>
              ))}
            </ul>
          ) : (
            <p>No teams available</p>
          )}
        </div>
      </div>
      <img src={pistaImage} className={style.backGroundImage}/>
    </div>
  );
  
};

export default Details;
