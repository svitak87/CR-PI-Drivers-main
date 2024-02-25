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
  FILTER_BY_TEAM
} from "./actions";

const initialState = {
  users: [],
  drivers: [],
  apiDrivers: [],
  dbDrivers: [],
  teams: [],
  currentPage: 1,
  driversPerPage: 9,
  queryDriversApi: [],
  queryDriversDb: [],
  filterDrivers: [],
  filterTeams: []
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
    case FIND_BY_NAME:
        return {
          ...state,
          queryDriversApi: [...payload.dataFromApi],
          queryDriversDb: [...payload.dataFromDb]
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
      console.log(teams);
      return {
        ...state,
        teams: [...state.teams, ...payload],
      };
    case FILTER_DRIVERS:
      if(payload === 'api'){
        return {
          ...state,
          filterDrivers: state.apiDrivers
        }
      }else if(payload === 'database'){
        return {
          ...state,
          filterDrivers: state.dbDrivers
        }
      }
      case FILTER_BY_TEAM:
        console.log(payload)
        return {
          ...state,
          filterTeams: state.apiDrivers.filter((driver) => {
            return driver.teams?.includes(payload);
          })
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
