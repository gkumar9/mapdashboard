import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createBrowserHistory } from "history";
import { HashRouter, Route } from "react-router-dom";
// import { BrowserRouter as Router , Route } from "react-router-dom";
import UI from "./UI.js";
import * as serviceWorker from "./serviceWorker";
import rms from "./rms.js";
import rmssub from "./rmssub.js";
import iaas from "./iaas.js";
import farmer from "./newfarmer.js";
import rmsedit from "./rmsedit.js";
import farmeredit from "./farmeredit.js";
import iaasmobile from "./iaasmobile.js";
import Highcharts from "highcharts/highstock";
import Keycloak from "keycloak-js";
import axios from "axios";
import Swal from "sweetalert2";
const borderRadius = require("highcharts-border-radius");
borderRadius(Highcharts);
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
const kc = new Keycloak({
  realm: "claro",
  url: "//sso.claroenergy.in/auth/",
  "ssl-required": "none",
  resource: "claro-apps",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  clientId: "claro-apps"
  // "clientSecret":"",
  // "enable-cors": true
});
let app = (
  <HashRouter basename={"/"}>
    <div>
    <Route exact path="/" kc={kc} render={props=>{return(<UI {...props} kc={kc}/>)}}  />
      <Route exact path="/rms" component={rms} />
      <Route exact path="/rmsedit" component={rmsedit} />
      <Route exact path="/farmer" component={farmer} />
      <Route exact path="/iaas" component={iaas} />
      <Route exact path="/rms/:id" component={rmssub} />
      <Route exact path="/farmeredit" component={farmeredit} />
      <Route exact path="/iaasmobile" component={iaasmobile} />
    </div>
  </HashRouter>
);
kc.init({ onLoad: "login-required" })
  .success(authenticated => {
    console.log(authenticated, kc);
    if (authenticated) {
      ReactDOM.render(
        app,
        document.getElementById("root")
      );
    }
  })
  .error(e => {
    Swal({
      type: "error",
      title: "Error Authentication"
    });
  });

axios.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + kc.token;
  return Promise.resolve(config);
});

// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   console.log('intercepetor',response)
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
