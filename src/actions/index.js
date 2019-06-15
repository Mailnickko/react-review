import axios from "axios";
import authService from "services/authService";
import axiosService from "services/axiosService";
// import { mockData } from "../mockData.js";

import TYPES from "./types";

const axiosInstance = axiosService.getInstance();

export const fetchRentals = () => {
  return dispatch => {
    axiosInstance
      .get(`/rentals`)
      .then(res => res.data || [])
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)));
  };
};

const fetchRentalsSuccess = rentals => {
  return {
    type: TYPES.FETCH_RENTALS_SUCCESS,
    rentals
  };
};

// const fetchRentalsError = () => {};

const fetchRentalByIdSuccess = selectedRental => {
  return {
    type: TYPES.FETCH_RENTAL_BY_ID_SUCCESS,
    selectedRental
  };
};

const fetchRentalByIdInit = () => {
  return {
    type: TYPES.FETCH_RENTAL_BY_ID_INIT
  };
};

export const fetchRentalById = rentalId => {
  return dispatch => {
    dispatch(fetchRentalByIdInit());

    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(selectedRental => dispatch(fetchRentalByIdSuccess(selectedRental)));
  };
};

// auth actions

export const register = userData => {
  return axios
    .post("/api/v1/users/register", userData)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
};

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: TYPES.LOGIN_SUCCESS,
    username
  };
};

const loginFailure = errors => {
  return {
    type: TYPES.LOGIN_FAILURE,
    errors
  };
};

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  };
};

export const login = userData => {
  return dispatch => {
    return axios
      .post("/api/v1/users/auth", userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({ response }) => {
        dispatch(loginFailure(response.data.errors));
      });
  };
};

export const logout = () => {
  authService.invalidateUser();

  return {
    type: TYPES.LOGOUT
  };
};
