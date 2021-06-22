import { requestHttp, HTTP_VERBS } from '../../utils/HttpRequest';
import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  AUTOLOGIN_FAILURE,
  AUTOLOGIN_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_CREATE_USERS_REQUEST,
  FETCH_CREATE_USERS_SUCCESS,
  FETCH_CREATE_USERS_FAILURE
} from "./userTypes";
import { USERS } from '../../constants/HttpEndpoints';
import { getToken, setToken } from '../../utils/LocalStorageToken';

export const fetchLogin = (credentials = {}) => {
  return (dispacth) => {
    dispacth(fetchLoginRequest());
    const callHttp = async (credentials) => {
      try {
        const response = await requestHttp({
          method: HTTP_VERBS.POST,
          endpoint: USERS.login,
          data: credentials
        });
        setToken(response.data.token);
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
    
    const callHttp = async () => {
      try {
        const token = getToken();
        await requestHttp({
          method: HTTP_VERBS.POST,
          endpoint: USERS.check,
          token:token
        });
        dispacth(autologinSuccess());
      } catch (error) {
        dispacth(autologinFailure());
      }
    };
    callHttp();
  }
}

export const fetchUsers = () => {
  return (dispacth) => {
    dispacth(fetchUserRequest());
    const callHttp = async () => {
      try {
        const token = getToken();
        const response = await requestHttp({
          method: HTTP_VERBS.GET,
          token,
          endpoint: USERS.getUsers
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

export const fetchCreateUsers = (dataUser = {}) => {
  return (dispacth) => {
    dispacth(fetchCreateUserRequest());
    const callHttp = async () => {
      try {
        const token = getToken();
        const response = await requestHttp({
          method: HTTP_VERBS.POST,
          token,
          endpoint: USERS.create,
          data:dataUser
        });
        
        dispacth(fetchCreateUserSuccess(response.data));
      } catch (error) {
        const messageError = error.response || 'error ';
        dispacth(fetchCreateUserFailure(messageError));
      }dispacth(fetchCreateUserSuccess(dataUser));
    };
    callHttp(dataUser);
  };
};

export const fetchCreateUserRequest = () => {
  return {
    type: FETCH_CREATE_USERS_REQUEST,
  };
};

export const fetchCreateUserSuccess = (user) => {
  return {
    type: FETCH_CREATE_USERS_SUCCESS,
    payload: user,
  };
};

export const fetchCreateUserFailure = (error) => {
  return {
    type: FETCH_CREATE_USERS_FAILURE,
    payload: error,
  };
};
