import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Register from "./views/Pages/Register/Register";
import { connect } from "react-redux";
import Loading from "./Components/Loading/Loading";

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Dashboard = React.lazy(() => import("./views/Pages/Dashboard"));

class App extends React.Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />
        <Redirect to="/login"></Redirect>
      </Switch>
    );

    if (this.props.loggedIn) {
      routes = (
        <Switch>
          <Route
            exact
            path="/dashboard"
            name="Dashboard Page"
            render={(props) => <Dashboard {...props} />}
          />

          <Redirect to="/dashboard"></Redirect>
        </Switch>
      );
    }

    return <React.Suspense fallback={<Loading />}>{routes}</React.Suspense>;
  }
}

function mapState(state) {
  return { loggedIn: state.authentication.loggedIn };
}

export default withRouter(connect(mapState, null)(App));
