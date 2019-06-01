import axios from "axios";
// import { mockData } from "../mockData.js";

import TYPES from "./types";

export const fetchRentals = () => {
  return dispatch => {
    axios
      .get(`/api/v1/rentals/`)
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

const fetchRentalsError = () => {};

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
