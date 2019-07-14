import axios from "axios";
import authService from "services/authService";
import axiosService from "services/axiosService";
// import { mockData } from "../mockData.js";

import TYPES from "./types";

const axiosInstance = axiosService.getInstance();

const fetchRentalsInit = () => {
  return {
    type: TYPES.FETCH_RENTALS_INIT
  };
};

const fetchRentalsFail = errors => {
  return {
    type: TYPES.FETCH_RENTALS_FAIL,
    errors
  };
};

export const fetchRentals = city => {
  const url = city ? `/rentals?city=${city}` : "/rentals";
  return dispatch => {
    dispatch(fetchRentalsInit());

    axiosInstance
      .get(url)
      .then(res => res.data || [])
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({ response }) =>
        dispatch(fetchRentalsFail(response.data.errors))
      );
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

export const createRental = rentalData => {
  return axiosInstance
    .post("/rentals", rentalData)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.errors));
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

export const createBooking = booking => {
  return axiosInstance
    .post("/bookings", booking)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
