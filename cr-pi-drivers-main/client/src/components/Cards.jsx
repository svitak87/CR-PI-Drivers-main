import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  previousPage,
} from "../redux/actions";
import Card from "./Card";
import style from "./Cards.module.css";

const Cards = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const queryDrivers = useSelector((state) => state.queryDrivers);
  const driversByTeams = useSelector((state) => state.driversByTeams);
  const driversApi = useSelector((state) => state.filterDriversApi);
  const driversDb = useSelector((state) => state.filterDriversDb);
  const orderedDateDrivers = useSelector((state) => state.orderDateDrivers);
  const orderedAlphaDrivers = useSelector((state) => state.orderAlphaDrivers);

  const currentPage = useSelector((state) => state.currentPage);
  const driversPerPage = useSelector((state) => state.driversPerPage);


  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(previousPage());
  };

  const totalCards = Array.isArray(drivers) ? [...drivers] : [];
  const indexOfLastCard = currentPage * driversPerPage;
  const indexOfFirstCard = indexOfLastCard - driversPerPage;

  const currentCards =
    queryDrivers.length > 0
      ? queryDrivers.slice(indexOfFirstCard, indexOfLastCard)
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
          disabled={
            currentCards.length < driversPerPage ||
            currentPage === Math.ceil(totalCards.length / driversPerPage)
          }
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default Cards;
