import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDrivers,
  findByName,
  getAllTeams,
  orderAlphabetic,
  filterDrivers,
  orderByDate,
  filterByTeam,
} from "../../redux/actions";
import Navbar from "../../components/Navbar";
import style from "../Home/Home.module.css";
import Cards from "../../components/Cards";
import backGroundImage from "../../assets/asfaltoFondo.jpg"

const Home = () => {
  const dispatch = useDispatch();
  const [noDriver, setNoDriver] = useState("");
  const teams = useSelector((state) => state.teams);
  const message = useSelector((state) => state.message)


  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  useEffect(() => {
    dispatch(getAllDrivers());
  }, []);

  const handleSearch = (query) => { 
    const obtainDriver = async () => {
      try {
        await dispatch(findByName(query));
      } catch (error) {
        if (error.message === "There are no drivers with that query") {
          setNoDriver("There are no drivers with that query");
          setTimeout(() => {
            setNoDriver("");
          }, 4000);
          throw { error: error.message };
        }
      }
    };
    obtainDriver();
  };

  const refresh = async () => {
    try {
      await dispatch(getAllDrivers());
    } catch (error) {
      throw error;
    }
  };
  const orderAlpha = async (event) => {
    try {
      await dispatch(orderAlphabetic(event.target.value));
    } catch (error) {
      throw error;
    }
  };
  const handlerFilterSource = async (event) => {
    try {
        await dispatch(filterDrivers(event.target.value))
    } catch (error) {
        throw error;
    }
};


  const orderDateOfBirth = async (event) => {
    try {
      await dispatch(orderByDate(event.target.value));
    } catch (error) {
      throw error;
    }
  };
  const handlerFilterTeams = async (event) => {
    try {
      await dispatch(filterByTeam(event.target.value));
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className={style.container}>
        <div>
          <form onSubmit={refresh}>
            <button type="submit" className={style.button}>
              Get all drivers
            </button>
          </form>
        </div>
        <div className={style.orderAlphaContainer}>
          <label>Order alphabetic:</label>
          <select onChange={orderAlpha}>
            <option value="ascending">Ascending A-Z</option>
            <option value="descending">Descending Z-A</option>
          </select>
        </div>
        <div className={style.filterSourceContainer}>
          <label>Filter drivers</label>
          <select onChange={handlerFilterSource}>
            <option value="database">Database</option>
            <option value="api">Api</option>
          </select>
        </div>
        <div className={style.orderDateOfBirthContainer}>
          <label>Order by date of birth</label>
          <select onChange={orderDateOfBirth}>
            <option value="ascending">Ascending 1910 - 1990 </option>
            <option value="descending">Descending 1990 - 1910</option>
          </select>
        </div>
        <div className={style.filterByTeamsContainer}>
          <label>Filter by teams</label>
          <select
            multiple
            id="teams"
            name="teams"
            value={teams}
            onChange={handlerFilterTeams}
          >
            {teams.map((team, index) => (
              <option key={index} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={style.noDriverContainter}>{noDriver && <h1 className={style.noDriver}>{noDriver}</h1>}</div>
      <div className={style.messageContainer}>{message && <h1 className={style.message}>{message}</h1>}</div>
      <Cards />
      <img src={backGroundImage} className={style.backGroundImage}/>
    </div>
  );
};

export default Home;
