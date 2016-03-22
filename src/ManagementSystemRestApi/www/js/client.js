import React from "react";
import ReactDOM from "react-dom";
import Formsy from "formsy-react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Favorites from "./pages/Favorites.jsx";
import Todos from "./pages/Todos.jsx";
import Layout from "./pages/Layout.jsx";
import Settings from "./pages/Settings.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const app = document.getElementById('app');

Formsy.addValidationRule('isRequired', function(values, value) {
  return (value && (typeof value == 'string' && value.length > 0)) === true;
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Todos}></IndexRoute>
      <Route path="favorites" component={Favorites}></Route>
      <Route path="settings" component={Settings}></Route>
      <Route path="authentication" component={Authentication}></Route>
    </Route>
  </Router>,
  app);
