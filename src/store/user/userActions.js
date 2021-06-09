import { requestHttp, HTTP_VERBS } from '../../utils/HttpRequest';
import { TOKEN } from '../../constants/Auth';
import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  AUTOLOGIN_FAILURE,
  AUTOLOGIN_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "./userTypes";

export const fetchLogin = (credentials = {}) => {
  return (dispacth) => {
    dispacth(fetchLoginRequest());
    const callHttp = async (credentials) => {
      try {
        const response = await requestHttp({
          method: HTTP_VERBS.POST,
          endpoint: "auth/signin",
          data: credentials
        });
        localStorage.setItem(TOKEN, response.data.token)
        dispacth(fetchLoginSuccess());
      } catch (error) {
        const messageError = error.response.statusText || 'error ';
        dispacth(fetchLoginFailure(messageError));
      }
    };
    callHttp(credentials);
  };
};

export const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  };
};

export const fetchLoginSuccess = () => {
  return {
    type: FETCH_LOGIN_SUCCESS
  };
};

export const fetchLoginFailure = (error) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error,
  };
};

export const autologinFailure = () => {
  return {
    type: AUTOLOGIN_FAILURE
  }
}

export const autologinSuccess = () => {
  return {
    type: AUTOLOGIN_SUCCESS
  }
}

export const autologin = () => {
  return (dispacth) => {
    const token = localStorage.getItem(TOKEN);
    if(token) dispacth(autologinSuccess());
    if(!token) dispacth(autologinFailure());
  }
}

export const fetchUsers = () => {
  return (dispacth) => {
    dispacth(fetchUserRequest());
    const callHttp = async () => {
      try {
        const token = localStorage.getItem(TOKEN);
        const response = await requestHttp({
          method: HTTP_VERBS.GET,
          token,
          endpoint: "users/"
        });
        
        dispacth(fetchUserSuccess(response.data));
      } catch (error) {
        const messageError = error.response.statusText || 'error ';
        dispacth(fetchUserFailure(messageError));
      }
    };
    callHttp();
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
