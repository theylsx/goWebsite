import React from "react";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Admin from "./pages/admin/admin.jsx";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/">
        {console.log("i am in app")}
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}
