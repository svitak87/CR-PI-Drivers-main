import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllDrivers,
  findByName,
  getAllTeams,
} from "../../redux/actions";
import Navbar from "../../components/Navbar";
import style from "../Home/Home.module.css";
import Cards from '../../components/Cards'

const Home = () => {
  const dispatch = useDispatch();
  const [noDriver, setNoDriver] = useState("");

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

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

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div>
        <div className={style.container}>
          <form onSubmit={refresh}>
            <button type="submit" className={style.button}>
              Get all drivers
            </button>
          </form>
          <div>{noDriver && <h1>{noDriver}</h1>}</div>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default Home;
