import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";

export const init = () => {
  const rootReducer = combineReducers({
    rentals: rentalReducer,
    selectedRental: selectedRentalReducer,
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
