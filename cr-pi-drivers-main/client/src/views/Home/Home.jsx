import React, { useState, useEffect } from "react";
import { getAllDrivers, findByName } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import style from "../Home/Home.module.css"

const Home = () => {
  const dispatch = useDispatch();
  const apiDrivers = useSelector((state) => state.apiDrivers);
  const dbDrivers = useSelector((state) => state.dbDrivers);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const handleSearch = (query) => {
    const obtainDriver = async () => {
      try {
        const driver = await dispatch(findByName(query));
        console.log(driver); 
        setFilteredCards(driver)
      } catch (error) {
        console.error("Error fetching driver:", error);
      }
    };
    obtainDriver();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllDrivers());
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const nextHandler = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousHandler = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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


  const totalCards = [...dbCards, ...apiCards];
const totalCardsLength = filteredCards.length > 0 ? filteredCards.length : totalCards.length;
const indexOfLastCard = currentPage * cardsPerPage;
const indexOfFirstCard = indexOfLastCard - cardsPerPage;
const currentCards = (filteredCards.length > 0 ? filteredCards : totalCards).slice(indexOfFirstCard, indexOfLastCard);

  


return (
  <div>
    <Navbar onSearch={handleSearch}/> 
    <div className={style.containerButtons}>
      <button className={style.previousButton} onClick={previousHandler} disabled={currentPage === 1}>
        Previous
      </button>
      <button className={style.nextButton}
        onClick={nextHandler}
        disabled={currentPage === Math.ceil( currentCards/ cardsPerPage)}
      >
        Next
      </button>
    </div>
    <div className={style.cardsContainer}>
      <div className={style.container}>
        {currentCards.map((card, index) => (
          <div key={index} className={style.card}>{card}</div>
        ))}
      </div>
    </div>
    <div className={style.containerButtons}>
      <button onClick={previousHandler} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={nextHandler}
        disabled={currentPage === Math.ceil(totalCards.length / cardsPerPage)}
      >
        Next
      </button>
    </div>
  </div>
);

};

export default Home;

