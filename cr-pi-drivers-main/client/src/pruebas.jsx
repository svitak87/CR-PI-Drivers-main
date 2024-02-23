import React, { useEffect, useState } from "react";
import { getAllDrivers, findByName, getDriverDetail, createDriver } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  // const drivers = useSelector((state) => state.drivers);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("")
  // const [id, setId] = useState("")
  // const [driverData, setDriverData] = useState({
  //   name: "",
  //   lastname: "",
  //   description: "",
  //   image: "",
  //   nationality: "",
  //   dob: "",
  //   TeamName: ""
  // })

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const drivers = await dispatch(getAllDrivers());
  //       console.log(drivers);
  //     } catch (error) {
  //       console.error("Error fetching drivers:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setDriverData(value)
  // };
  const handleChange = (event) => {
    const { name, value } = event.target; // Obtener el nombre y el valor del input
    setDriverData(prevState => ({
      ...prevState,
      [name]: value // Actualizar el campo correspondiente en driverData
    }));
  };
  

  const submitForm = (event) => {
    event.preventDefault();
    const obtainDriver = async () => {
      try {
        const driver = await dispatch(findByName(query));
        console.log(driver);
      } catch (error) {
        console.error("Error fetching driver:", error);
      }
    };
    obtainDriver();
  };

  // const submitForm = (event) => {
  //   event.preventDefault();
  //   const driverDetail = async () => {
  //     try {
  //       const driverDetail = await dispatch(getDriverDetail(id))
  //       console.log(driverDetail)
  //     } catch (error) {
  //       console.error("Error fetching driver:", error);
  //     }
  //   }
  //   driverDetail();
  // }
  // const submitForm = (event) => {
  //   event.preventDefault();
  //   const creationDriver = async () => {
  //     try {
  //       const newDriver = await dispatch(createDriver(driverData));
  //       console.log(newDriver)
  //     } catch (error) {
  //       console.error("Error fetching driver:", error);
  //     }
  //   }
  //   creationDriver();
  // }


  return (
    <div>
      <h1>Ventana de bienvenida</h1>
      <form onSubmit={submitForm}>
      <input type="text" name="name" value={query} onChange={handleChange} />
      {/* <input type="text" name="lastname" value={driverData.lastname} onChange={handleChange} />
      <input type="text" name="description" value={driverData.description} onChange={handleChange} />
      <input type="text" name="image" value={driverData.image} onChange={handleChange} />
      <input type="text" name="nationality" value={driverData.nationality} onChange={handleChange} />
      <input type="text" name="dob" value={driverData.dob} onChange={handleChange} />
      <input type="text" name="TeamName" value={driverData.TeamName} onChange={handleChange} /> */}

        <button>buscar</button>
      </form>
    </div>
  );
};

export default Home;
