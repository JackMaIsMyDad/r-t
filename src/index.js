import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import store from "./store";
import Login from "./view/login";
import AuthorizedRoute from "./view";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect from="/" exact to="/login" />
        <AuthorizedRoute path="/layout" component={App} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
