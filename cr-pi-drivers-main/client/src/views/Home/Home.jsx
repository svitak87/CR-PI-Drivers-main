import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDrivers,
  findByName,
  nextPage,
  previousPage,
} from "../../redux/actions";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import style from "../Home/Home.module.css";


const Home = () => {
  const dispatch = useDispatch();
  const apiDrivers = useSelector((state) => state.apiDrivers);
  const dbDrivers = useSelector((state) => state.dbDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const driversPerPage = useSelector((state) => state.driversPerPage);
  const queryApi = useSelector((state) => state.queryDriversApi);
  const queryDb = useSelector((state) => state.queryDriversDb);
  const [noDriver, setNoDriver] = useState("")

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const handleSearch = (query) => {
    const obtainDriver = async () => {
      try {
        await dispatch(findByName(query));
      } catch (error) {
        if(error.message === "There are no drivers with that query"){
          setNoDriver("There are no drivers with that query")
          setTimeout(() => {
            setNoDriver("")
          }, 4000);
          throw {error: error.message}
        }
      }
    };
    obtainDriver();
  };

  const apiQueryCards = queryApi.map((driver, index) => (
    <Card
      key={`api-${driver.id}-${index}`}
      id={driver.id}
      image={driver.image.url}
      apiName={driver.name}
      teams={driver.teams}
      source="api"
    />
  ));

  const dbQueryCards = queryDb.map((driver, index) => (
    <Card
      key={`db-${driver.id}-${index}`}
      id={driver.id}
      image={driver.image}
      dbName={{ name: driver.name, lastname: driver.lastname }}
      teams={driver.Teams ? driver.Teams.map((team) => team.name).join(", ") : undefined} 
      source="db"
    />
  ));


  const dbCards = dbDrivers.map((driver, index) => (
    <Card
      key={`db-${driver.id}-${index}`}
      id={driver.id}
      image={driver.image}
      dbName={{ name: driver.name, lastname: driver.lastname }}
      teams={driver.Teams.map((team) => team.name).join(", ")}
      source="db"
    />
  ));

  const apiCards = apiDrivers.map((driver, index) => (
    <Card
      key={`api-${driver.id}-${index}`}
      id={driver.id}
      image={driver.image.url}
      apiName={driver.name}
      teams={driver.teams}
      source="api"
    />
  ));

  const filteredQuery = [...apiQueryCards, ...dbQueryCards]

  const totalCards = [...dbCards, ...apiCards,];
  const indexOfLastCard = currentPage * driversPerPage;
  const indexOfFirstCard = indexOfLastCard - driversPerPage;
  const currentCards = filteredQuery.length > 0 ? filteredQuery : totalCards.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    dispatch(nextPage(currentPage));
  };

  const handlePreviousPage = () => {
    dispatch(previousPage(currentPage));
  };
    const refresh = async () => {
      try {
       await dispatch(getAllDrivers())
      } catch (error) {
        throw error;
      }
    }
    
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div>
        <form onSubmit={refresh}>
        <button type="submit">Get all drivers</button>
        </form>
      </div>
      <div className={style.containerButtons}>
        <button
          className={style.previousButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={style.nextButton}
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(totalCards.length / driversPerPage)
          }
        >
          Next
        </button>
      </div>
      <div>
        {noDriver && <h1>{noDriver}</h1>}
      </div>
      <div className={style.cardsContainer}>
        <div className={style.container}>
          {currentCards.map((card, index) => (
            <div key={index} className={style.card}>
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
