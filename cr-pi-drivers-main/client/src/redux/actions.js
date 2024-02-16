export const REGISTER_USER = "REGISTER_USER";
export const USER_LOGIN = "USER_LOGIN";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";

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

export const recoverPassword = (credentialData) =>{
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/recover", {
        method: 'PUT',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialData)
      })
      if(response.status === 400 || response.status === 404){
        throw new Error("Incorrect credentials, verify your answers")
      }
      const data = await response.json();
      dispatch({ type: FORGOT_PASSWORD, payload: data });
    } catch (error) {
      
    }
  }
}
