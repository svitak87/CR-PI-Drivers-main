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
      const queryFromApiResponse = await axios.get(
        `http://localhost:3001/query/api/name?name=${query}`
      );
      let queryFromDbResponse;
      try {
        queryFromDbResponse = await axios.get(
          `http://localhost:3001/query/database/name?name=${query}`
        );
      } catch (Error) {
        if (Error.response && Error.response.status === 404) {
          queryFromDbResponse = { data: [] };
        } else {
          throw Error;
        }
      }

      const combineInfo = {
        dataFromDb: queryFromDbResponse.data,
        dataFromApi: queryFromApiResponse.data,
      };
      dispatch({ type: FIND_BY_NAME, payload: combineInfo });
      return combineInfo;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw Error("There are no drivers with that query");
      }
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

export const nextPage = (currentPage) => {
  return (dispatch) => {
    const nextpage = currentPage + 1;
    dispatch({ type: NEXT_PAGE, payload: nextpage });
  };
};

export const previousPage = (currentPage) => {
  return (dispatch) => {
    const previouspage = currentPage - 1;
    dispatch({ type: PREVIOUS_PAGE, payload: previouspage });
  };
};
