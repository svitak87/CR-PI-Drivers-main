import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage } from "../redux/actions";
import Card from "./Card";
import style from "./Cards.module.css";

const Cards = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const queryDrivers = useSelector((state) => state.queryDrivers);
  const driversByTeams = useSelector((state) => state.driversByTeams);
  const filteredDrivers = useSelector((state) => state.filterDrivers);

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
      : filteredDrivers.length > 0
      ? filteredDrivers.slice(indexOfFirstCard, indexOfLastCard)
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
