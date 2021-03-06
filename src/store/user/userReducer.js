import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_REQUEST,
  AUTOLOGIN_FAILURE,
  AUTOLOGIN_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_CREATE_USERS_REQUEST,
  FETCH_CREATE_USERS_SUCCESS,
  FETCH_CREATE_USERS_FAILURE,
  USER_SIGN_OFF
} from "./userTypes";

const initialState = {
  loading: false,
  isAuth: false,
  error: "",
  splash: true,
  users: [],
  singleUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        isAuth: true
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false
      };
    case AUTOLOGIN_SUCCESS :
      return {
        ...state,
        isAuth:true,
        splash: false
      };
    case AUTOLOGIN_FAILURE:
      return{
        ...state,
        isAuth:false,
        splash: false
      };
    case FETCH_USERS_REQUEST:
      return{
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return{
        ...state,
        isAuth:true,
        splash: false,
        users: action.payload
      };
    case FETCH_USERS_FAILURE:
      return{
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false
      };
    case FETCH_CREATE_USERS_REQUEST:
      return{
        ...state,
        loading: true
      };
    case FETCH_CREATE_USERS_SUCCESS:
      return{
        ...state,
        //isAuth:true,
        splash: false,
        loading: false,
        singleUser: action.payload
      };
    case FETCH_CREATE_USERS_FAILURE:
      return{
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false
      };
    case USER_SIGN_OFF:
      return{
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducer;
