export const REGISTER_USER = "REGISTER_USER";
export const USER_LOGIN = "USER_LOGIN";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const GET_ALL_DRIVERS = "GET_ALL_DRIVERS";
export const FIND_BY_NAME = "FIND_BY_NAME";
export const GET_DRIVER_DETAIL = "GET_DRIVER_DETAIL";
export const CREATE_DRIVER = "CREATE_DRIVER";
export const GET_ALL_TEAMS = "GET_ALL_TEAMS";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const FILTER_DRIVERS = "FILTER_DRIVERS";
export const FILTER_BY_TEAM = "FILTER_BY_TEAM";
export const ORDER_DRIVERS_API_DOB = "ORDER_DRIVERS_API_DOB";
export const ORDER_DRIVERS_API_ALPHA = "ORDER_DRIVERS_API_ALPHA";

import axios from "axios";

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        userData
      );
      const data = response.data;

      dispatch({ type: REGISTER_USER, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        throw Error("User already exists");
      } else if (error.response && error.response.status === 400) {
        throw Error("Incomplete data");
      }
    }
  };
};

export const userLogin = (credentialData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        credentialData
      );
      const data = response.data;

      dispatch({ type: USER_LOGIN, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw Error("Email doesn't exist");
      } else if (error.response && error.response.status === 403) {
        throw Error("Password doesn't match");
      } else {
        throw error;
      }
    }
  };
};


export const recoverPassword = (userCredentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/users/recover",
        userCredentials
      );
      const data = response.data;

      dispatch({ type: FORGOT_PASSWORD, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw Error("Incorrect answers");
      } else if (error.response && error.response.status === 400) {
        throw Error("Incomplete data provided");
      } else if (error.response && error.response.status === 404) {
        throw Error("Email doesn't exist");
      }
    }
  };
};

export const getAllDrivers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/drivers");
      const drivers = response.data;

      dispatch({ type: GET_ALL_DRIVERS, payload: drivers });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw { error: error.message };
      }
    }
  };
};

export const findByName = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/drivers/name?name=${query}`
      );
      const data = response.data;

      dispatch({ type: FIND_BY_NAME, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("There are no drivers with that query");
      }
    }
  };
};

export const getDriverDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/drivers/${id}`);
      const data = response.data;

      dispatch({ type: GET_DRIVER_DETAIL, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { error: error.response };
      }
    }
  };
};

export const createDriver = (driverData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/drivers`,
        driverData
      );
      const data = response.data;

      dispatch({ type: CREATE_DRIVER, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { error: error.response };
      }
    }
  };
};

export const getAllTeams = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/teams`);

      dispatch({ type: GET_ALL_TEAMS, payload: response.data });
    } catch (error) {
      if (error.message && error.response.status === 400) {
        return { error: error.response };
      }
      throw error;
    }
  };
};

export const filterDrivers = (filter) => {
  return { type: FILTER_DRIVERS, payload: filter };
};

export const filterByTeam = (team) => {
  return { type: FILTER_BY_TEAM, payload: team };
};

export const orderByDate = (order) => {
  return { type: ORDER_DRIVERS_API_DOB, payload: order };
};

export const orderAlphabetic = (order) => {
  return { type: ORDER_DRIVERS_API_ALPHA, payload: order };
};

export const nextPage = () => {
  return (dispatch, getState) => {
    const { currentPage } = getState();
    const nextPage = currentPage + 1;
    dispatch({ type: NEXT_PAGE, payload: nextPage });
  };
};

export const previousPage = () => {
  return (dispatch, getState) => {
    const { currentPage } = getState();
    const previousPage = currentPage - 1;
    dispatch({ type: PREVIOUS_PAGE, payload: previousPage });
  };
};
