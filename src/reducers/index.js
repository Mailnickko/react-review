import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import { authReducer } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import userBookingsReducer from "./booking-reducer";
import thunk from "redux-thunk";

export const init = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    rentals: rentalReducer,
    selectedRental: selectedRentalReducer,
    userBookings: userBookingsReducer,
    form: formReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
