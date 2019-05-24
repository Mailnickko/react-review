import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import thunk from "redux-thunk";

export const init = () => {
  const rootReducer = combineReducers({
    rentals: rentalReducer,
    selectedRental: selectedRentalReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
