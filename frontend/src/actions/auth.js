import axios from "axios";
import { returnErrors } from "./messages";
import { USER_LOADED, AUTH_ERROR, USER_LOADING } from "./types";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from "./types";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  // dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Login user
export const login = (username, password) => (dispatch) => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Register user
export const register = ({ username, password, email }) => (dispatch) => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ username, password, email });

  axios
    .post("/api/auth/register/", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Logout user
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with config
export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  // Header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //If token add to headers config
  if (token) {
    config.headers["Authorization"] = `token ${token}`;
  }
  return config;
};