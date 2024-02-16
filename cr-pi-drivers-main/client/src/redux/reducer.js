import { USER_LOGIN, REGISTER_USER, FORGOT_PASSWORD } from "./actions";

const initialState = {
  users: [],
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
      }
  }
};

export default rootReducer;
