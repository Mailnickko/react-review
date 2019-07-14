import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { init } from "./reducers/index";

import Header from "./components/shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalCreate from "./components/rental/rental-create/RentalCreate";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ProtectedRoute from "components/shared/auth/ProtectedRoute";
import RentalSearchListing from "./components/rental/rental-listing/RentalSearchListing";
import LoggedInRoute from "components/shared/auth/LoggedInRoute";
import * as actions from "actions";

import "./App.css";

const store = init();

class App extends Component {
  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/rentals" />}
                />
                <Route exact path="/rentals" component={RentalListing} />
                <Route
                  exact
                  path="/rentals/:city/homes"
                  component={RentalSearchListing}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/new"
                  component={RentalCreate}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/:id"
                  component={RentalDetail}
                />
                <Route exact path="/login" component={Login} />
                <LoggedInRoute exact path="/register" component={Register} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
