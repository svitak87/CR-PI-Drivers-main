import {
  USER_LOGIN,
  REGISTER_USER,
  FORGOT_PASSWORD,
  GET_ALL_DRIVERS,
  FIND_BY_NAME,
  GET_DRIVER_DETAIL,
  DELETE_DRIVER,
  CREATE_DRIVER,
  GET_ALL_TEAMS,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  FILTER_DRIVERS,
  FILTER_BY_TEAM,
  ORDER_DRIVERS_DOB,
  ORDER_DRIVERS_ALPHA,
} from "./actions";

const initialState = {
  users: [],
  drivers: [],
  queryDrivers: [],
  driversByTeams: [],
  filterDrivers: [],
  teams: [],
  currentPage: 1,
  driversPerPage: 9,
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
        currentPage: 1,
      };
    case GET_DRIVER_DETAIL:
      return {
        ...state,
        drivers: payload,
      };
    case DELETE_DRIVER:
      const updatedDrivers = state.drivers.filter((driver) => {
        return String(driver.id) !== payload;
      });
          
      const updateOnFilter = state.filterDrivers.filter((driver) => {
        return String(driver.id) !== payload
      })

      const updatedOnTeams = state.driversByTeams.filter((driver) => {
        return String(driver.id) !== payload
      })

      const updatedOnQuery = state.queryDrivers.filter((driver) => {
        return String(driver.id) !== payload
      })
      return {
        ...state,
        drivers: updatedDrivers,
        filterDrivers: updateOnFilter,
        driversByTeams: updatedOnTeams,
        queryDrivers: updatedOnQuery,
      };

    case CREATE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, payload],
      };

    case FILTER_DRIVERS:
      let filtrado;
      if (payload === "api") {
        filtrado = state.drivers.filter((driver) => {
          return typeof driver.id === "number";
        });
      } else if (payload === "database") {
        filtrado = state.drivers.filter((driver) => {
          return typeof driver.id === "string";
        });
      }
      return {
        ...state,
        currentPage: 1,
        filterDrivers: filtrado,
        driversByTeams: [],
        queryDrivers: [],
      };

    case FILTER_BY_TEAM:
      const byTeamDrivers = [...state.drivers];
      return {
        ...state,
        driversByTeams: byTeamDrivers.filter((driver) => {
          return driver.teams.some((team) => team.name === payload);
        }),
        queryDrivers: [],
        currentPage: 1,
      };

    case ORDER_DRIVERS_DOB:
      const orderedDrivers = [...state.drivers];
      const orderedFiltered = [...state.filterDrivers];
      const orderedByTeams = [...state.driversByTeams];
      const orderedByQuery = [...state.queryDrivers];

      return {
        ...state,
        drivers: orderedDrivers.sort((a, b) => {
          const dateA = new Date(a.dob).getTime();
          const dateB = new Date(b.dob).getTime();
          if (payload === "ascending") {
            return dateA - dateB;
          } else if (payload === "descending") {
            return dateB - dateA;
          }
        }),
        filterDrivers: orderedFiltered.sort((a, b) => {
          const dateA = new Date(a.dob).getTime();
          const dateB = new Date(b.dob).getTime();
          if (payload === "ascending") {
            return dateA - dateB;
          } else if (payload === "descending") {
            return dateB - dateA;
          }
        }),
        driversByTeams: orderedByTeams.sort((a, b) => {
          const dateA = new Date(a.dob).getTime();
          const dateB = new Date(b.dob).getTime();
          if (payload === "ascending") {
            return dateA - dateB;
          } else if (payload === "descending") {
            return dateB - dateA;
          }
        }),
        queryDrivers: orderedByQuery.sort((a, b) => {
          const dateA = new Date(a.dob).getTime();
          const dateB = new Date(b.dob).getTime();
          if (payload === "ascending") {
            return dateA - dateB;
          } else if (payload === "descending") {
            return dateB - dateA;
          }
        }),
        currentPage: 1,
      };

    case ORDER_DRIVERS_ALPHA:
      const orderAlpha = [...state.drivers];
      const orderAlphaFiltered = [...state.filterDrivers];
      const orderedAlphaByTeam = [...state.driversByTeams];
      const orderedAlphaQuery = [...state.queryDrivers];
      return {
        ...state,
        currentPage: 1,
        drivers: orderAlpha.sort((a, b) => {
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
        filterDrivers: orderAlphaFiltered.sort((a, b) => {
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
        driversByTeams: orderedAlphaByTeam.sort((a, b) => {
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
        queryDrivers: orderedAlphaQuery.sort((a, b) => {
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
    case GET_ALL_TEAMS:
      return {
        ...state,
        teams: payload,
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
      return { ...state };
  }
};

export default rootReducer;
