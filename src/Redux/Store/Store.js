import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../Reducer";

const loggerMiddleware = createLogger();

let middlewares = [];

console.log(process.env);

if (process.env.NODE_ENV === "production") {
  middlewares = [thunkMiddleware];
} else {
  middlewares = [thunkMiddleware, loggerMiddleware];
}

export const Store = createStore(rootReducer, applyMiddleware(...middlewares));
