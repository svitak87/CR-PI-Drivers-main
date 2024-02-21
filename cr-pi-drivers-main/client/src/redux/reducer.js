import {
  USER_LOGIN,
  REGISTER_USER,
  FORGOT_PASSWORD,
  GET_ALL_DRIVERS,
  FIND_BY_NAME,
  GET_DRIVER_DETAIL,
  CREATE_DRIVER,
  GET_ALL_TEAMS
} from "./actions";

const initialState = {
  users: [],
  drivers: [],
  apiDrivers: [],
  dbDrivers: [],
  teams: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        users: payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        users: payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        users: payload,
      };
    case GET_ALL_DRIVERS:
      return {
        ...state,
        apiDrivers: [...payload.dataFromApi.data],
        dbDrivers: [...payload.dataFromDb.data],
      };
    case FIND_BY_NAME: //ai es donde funciona la busqueda por query
      return {
        ...state,
        drivers: state.drivers.filter((driver) => {
          return driver.name === payload.data.name;
        }),
      };

    case GET_DRIVER_DETAIL:
      return {
        ...state,
        drivers: payload,
      };
    case CREATE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, payload],
      };
      case GET_ALL_TEAMS:
        console.log(teams)
      return {
        ...state,
        teams: [...state.teams, ...payload]
      }
    default:
      return state; 
  }
};

export default rootReducer;
