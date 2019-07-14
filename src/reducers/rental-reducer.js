import TYPES from "../actions/types";

const INITIAL_STATE = {
  rentals: {
    data: []
  },
  selectedRental: {
    data: {}
  }
};

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case TYPES.FETCH_RENTALS_INIT:
      return { ...state, data: [], errors: [] };
    case TYPES.FETCH_RENTALS_SUCCESS:
      return { ...state, data: action.rentals };
    case TYPES.FETCH_RENTALS_FAIL:
      return Object.assign({}, state, { errors: action.errors, data: [] });
    default:
      return state;
  }
};

export const selectedRentalReducer = (
  state = INITIAL_STATE.selectedRental,
  action
) => {
  switch (action.type) {
    case TYPES.FETCH_RENTAL_BY_ID_INIT:
      return { ...state, data: {} };
    case TYPES.FETCH_RENTAL_BY_ID_SUCCESS:
      return Object.assign({}, state, { data: action.selectedRental });
    default:
      return state;
  }
};
