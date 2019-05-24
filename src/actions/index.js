import { mockData } from "../mockData.js";
import TYPES from "./types";

export const fetchRentals = () => {
  return {
    type: TYPES.FETCH_RENTALS,
    rentals: mockData
  };
};

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
    setTimeout(() => {
      const selectedRental = mockData.find(rental => rental.id === rentalId);
      dispatch(fetchRentalByIdSuccess(selectedRental));
    }, 1000);
  };
};
