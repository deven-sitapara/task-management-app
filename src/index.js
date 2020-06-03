import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Store } from "./Redux/Store/Store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

//Fake
//import { configureFakeBackend } from "./Helper/fake-backend";

//serviceWorker.register();

//configureFakeBackend();

ReactDOM.render(
  <Provider store={Store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
