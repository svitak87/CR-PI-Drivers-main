export const REGISTER_USER = "REGISTER_USER";
export const USER_LOGIN = "USER_LOGIN";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const GET_ALL_DRIVERS = "GET_ALL_DRIVERS";
export const FIND_BY_NAME = "FIND_BY_NAME";
export const GET_DRIVER_DETAIL = "GET_DRIVER_DETAIL";
export const CREATE_DRIVER = "CREATE_DRIVER";
export const GET_ALL_TEAMS = "GET_ALL_TEAMS";

import axios from "axios";

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 409) {
        throw new Error("User already exists!");
      }

      const data = await response.json();
      dispatch({ type: REGISTER_USER, payload: data });
    } catch (error) {
      throw error;
    }
  };
};

export const userLogin = (credentialData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialData),
      });
      if (response.status === 403) {
        throw Error("Incorrect credentials");
      }
      const data = await response.json();
      dispatch({ type: USER_LOGIN, payload: data });
    } catch (error) {
      throw error;
    }
  };
};

export const recoverPassword = (userCredentials) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/recover", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      if (response.status === 400) {
        throw new Error("Incomplete data provided");
      } else if (response.status === 404) {
        throw new Error("Email doesn't exist");
      } else if (response.status === 403) {
        throw new Error("Incorrect answers");
      }
      const data = await response.json();
      dispatch({ type: FORGOT_PASSWORD, payload: data });
    } catch (error) {}
  };
};

export const getAllDrivers = () => {
  return async function (dispatch) {
    try {
      const [dataFromDb, dataFromApi] = await Promise.all([
        axios.get("http://localhost:3001/drivers").catch((error) => {
          if (error.response && error.response.status === 404) {
            return { data: [] };
          }
          throw error;
        }),
        axios.get("http://localhost:5000/drivers"),
      ]);

      const combineInfo = {
        dataFromDb: dataFromDb,
        dataFromApi: dataFromApi,
      };
      dispatch({ type: GET_ALL_DRIVERS, payload: combineInfo });
      return combineInfo;
    } catch (error) {
      throw error;
    }
  };
};

export const findByName = (query) => {
  return async function (dispatch) {
    try {
      const response = await axios
        .get(`http://localhost:3001/query/drivers/name?name=${query}`)
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return { error: error.response };
          }
          throw error;
        });
      dispatch({ type: FIND_BY_NAME, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getDriverDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios
        .get(`http://localhost:3001/drivers/${id}`)
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return { error: error.response };
          }
          throw error;
        });
      dispatch({ type: GET_DRIVER_DETAIL, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const createDriver = (driverData) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .post(`http://localhost:3001/drivers`, driverData)
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            return { error: error.response };
          }
          throw error;
        });
      dispatch({ type: CREATE_DRIVER, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getAllTeams = () => {
  return async (dispatch) => {
    try {
      const response = await axios
      .get(`http://localhost:3001/teams`);
      console.log(response); // Mueve esta línea aquí
      dispatch({ type: GET_ALL_TEAMS, payload: response.data });
    } catch (error) {
      if (error.message && error.response.status === 400) {
        return { error: error.response };
      }
      throw error;
    }
  };
};

