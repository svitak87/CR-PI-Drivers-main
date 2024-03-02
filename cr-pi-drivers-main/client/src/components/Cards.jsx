import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDrivers,
  nextPage,
  previousPage,
  filterByTeam,
  filterDrivers,
  orderByDate,
  orderAlphabetic
} from "../redux/actions";
import Card from "./Card";
import style from "./Cards.module.css";

const Cards = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const drivers = useSelector((state) => state.drivers);
  const queryDrivers = useSelector((state) => state.queryDrivers);
  const driversByTeams = useSelector((state) => state.driversByTeams);
  const driversApi = useSelector((state) => state.filterDriversApi);
  const driversDb = useSelector((state) => state.filterDriversDb);
  const orderedDateDrivers = useSelector((state) => state.orderDateDrivers);
  const orderedAlphaDrivers = useSelector((state) => state.orderAlphaDrivers);

  const currentPage = useSelector((state) => state.currentPage);
  const driversPerPage = useSelector((state) => state.driversPerPage);

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(previousPage());
  };

  const handlerFilterTeams = async (event) => {
    try {
      await dispatch(filterByTeam(event.target.value));
    } catch (error) {
      throw error;
    }
  };

  const handlerFilterSource = async (event) => {
    try {
      await dispatch(filterDrivers(event.target.value));
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

  const orderAlpha = async (event) => {
    try {
      await dispatch(orderAlphabetic(event.target.value));
    } catch (error) {
      throw error;
    }
  };

  const totalCards = Array.isArray(drivers) ? [...drivers] : [];
  const queryDriver = [...queryDrivers];
  const indexOfLastCard = currentPage * driversPerPage;
  const indexOfFirstCard = indexOfLastCard - driversPerPage;

  const currentCards =
    queryDriver.length > 0
      ? queryDriver
      : driversByTeams.length > 0
      ? driversByTeams.slice(indexOfFirstCard, indexOfLastCard)
      : driversApi.length > 0
      ? driversApi.slice(indexOfFirstCard, indexOfLastCard)
      : driversDb.length > 0
      ? driversDb.slice(indexOfFirstCard, indexOfLastCard)
      : orderedDateDrivers.length > 0
      ? orderedDateDrivers.slice(indexOfFirstCard, indexOfLastCard)
      : orderedAlphaDrivers.length > 0
      ? orderedAlphaDrivers.slice(indexOfFirstCard, indexOfLastCard)
      : totalCards.slice(indexOfFirstCard, indexOfLastCard);

  const renderCards = currentCards.map((driver, index) => (
    <Card
      key={index}
      id={driver.id}
      name={driver.name}
      lastname={driver.lastname}
      image={driver.image}
      teams={driver.teams.map((team) => team.name).join(", ")}
    />
  ));

  return (
    <div>
      <div>
        <div>
          <label>Order alphabetic:</label>
          <select onChange={orderAlpha}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <div>
          <label>Filter drivers</label>
          <select onChange={handlerFilterSource}>
            <option value="api">Api</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div>
          <label>Order by date of birth</label>
          <select onChange={orderDateOfBirth}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
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
      <div className={style.container}>{renderCards}</div>
      <div className={style.buttons}>
        <button
          className={style.button}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <button
          className={style.button}
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(drivers.length / driversPerPage)}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default Cards;
