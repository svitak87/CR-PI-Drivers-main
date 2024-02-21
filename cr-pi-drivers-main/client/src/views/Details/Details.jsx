import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDriverDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const driver = useSelector((state) => state.drivers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDriverDetail(id));
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <>
        <h2>Name: {driver.name}</h2>
        <h2>Lastname: {driver.lastname}</h2>
        <h2>ID: {driver.id}</h2>
        <h2>Nationality: {driver.nationality}</h2>
        <h2>Description: {driver.description}</h2>
        <h3>Date of birth: {driver.dob}</h3>
        <img src={driver.image} alt={driver.name} />
        <h2>Teams:</h2>
        {Array.isArray(driver.Teams) && driver.Teams.length > 0 ? (
          <ul>
            {driver.Teams.map((team, index) => (
              <li key={index}>{team.name}</li>
            ))}
          </ul>
        ) : driver.teams ? (
          <ul>
            {driver.teams.split(",").map((team, index) => (
              <li key={index}>{team.trim()}</li>
            ))}
          </ul>
        ) : (
          <p>No teams available</p>
        )}
        <Link to="/home">
          <button>Go back</button>
        </Link>
      </>
    </div>
  );
};

export default Details;
