import {
  USER_LOGIN,
  REGISTER_USER,
  FORGOT_PASSWORD,
  GET_ALL_DRIVERS,
  FIND_BY_NAME,
  GET_DRIVER_DETAIL,
  CREATE_DRIVER,
  GET_ALL_TEAMS,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  FILTER_DRIVERS,
  FILTER_BY_TEAM,
  ORDER_DRIVERS_API_DOB,
  ORDER_DRIVERS_API_ALPHA,
} from "./actions";

const initialState = {
  users: [],
  drivers: [],
  queryDrivers: [],
  driversByTeams: [],
  filterDriversApi: [],
  filterDriversDb: [],
  teams: [],
  currentPage: 1,
  driversPerPage: 9,
  orderDateDrivers: [],
  orderAlphaDrivers: [],
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
        drivers: payload,
      };
    case FIND_BY_NAME:
      return {
        ...state,
        queryDrivers: payload,
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
      return {
        ...state,
        teams: [...state.teams, ...payload],
      };
    case FILTER_DRIVERS:
      if (payload === "api") {
        const apiDrivers = state.drivers.filter((driver) =>
          Number.isInteger(driver.id)
        );
        return {
          ...state,
          filterDriversApi: apiDrivers,
        };
      } else if (payload === "database") {
        const dbDrivers = state.drivers.filter(
          (driver) => typeof driver.id === "string"
        );
        return {
          ...state,
          filterDriversDb: dbDrivers,
        };
      }
    case FILTER_BY_TEAM:
      const filteredDrivers = state.drivers.filter((driver) => {
        return driver.teams.some((team) => team.name === payload);
      });
      return {
        ...state,
        driversByTeams: filteredDrivers,
      };
    case ORDER_DRIVERS_API_DOB:
      console.log(payload)
      let orderedDrivers = [...state.drivers];
      orderedDrivers.sort((a, b) => {
        const dateA = new Date(a.dob).getTime();
        const dateB = new Date(b.dob).getTime();
        if (payload === "ascending") {
          return dateA - dateB;
        } else if (payload === "descending") {
          return dateB - dateA;
        }
        return 0;
      });
      return {
        ...state,
        orderDateDrivers: orderedDrivers,
      };
    case ORDER_DRIVERS_API_ALPHA:
      return {
        ...state,
        orderAlphaDrivers: state.drivers.slice().sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (payload === "ascending") {
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
          } else if (payload === "descending") {
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
          }
        }),
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
