import React, { useState, useEffect } from "react";
import { createDriver, getAllTeams } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teams = useSelector((state) => state.teams);
  const [created, setCreated] = useState(false);
  const [errorCreation, setErrorCreation] = useState("");
  const [driverData, setDriverData] = useState({
    name: "",
    lastname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    TeamName: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDriverData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTeamsChange = (event) => {
    const { options } = event.target;
    let selectedTeams = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTeams.push(options[i].value);
      }
    }
    setDriverData((prevState) => ({
      ...prevState,
      TeamName: [...selectedTeams],
    }));
    console.log(selectedTeams);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(createDriver(driverData));
      if (response.error) {
        setCreated(false);
        setErrorCreation("Incomplete data");
        setTimeout(() => {
          setErrorCreation("");
          setDriverData({
            name: "",
            lastname: "",
            description: "",
            image: "",
            nationality: "",
            dob: "",
          });
        }, 4000);
      } else {
        setCreated(true);
        setErrorCreation("The driver was created succesfully");
        setTimeout(() => {
          setDriverData({
            name: "",
            lastname: "",
            description: "",
            image: "",
            nationality: "",
            dob: "",
          });
          navigate("/home");
        }, 4000);
      }
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };
  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  const disebleButton = () => {
    return (
      !driverData.TeamName ||
      !driverData.name ||
      !driverData.lastname ||
      !driverData.description ||
      !driverData.nationality ||
      !driverData.dob
    );
  };

  return (
    <div>
      <Navbar />
      <h2>Create your personal driver:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">First Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={driverData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={driverData.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={driverData.nationality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={driverData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="text"
            id="dob"
            name="dob"
            value={driverData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={driverData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="teams">Teams:</label>
          <select
            multiple
            id="teams"
            name="teams"
            value={driverData.TeamName}
            onChange={handleTeamsChange}
          >
            {teams.map((team, index) => (
              <option key={index} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={disebleButton()}>
          Create Driver
        </button>
      </form>
      {errorCreation && <p>{errorCreation}</p>}
      <Link to="/home">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default Form;

