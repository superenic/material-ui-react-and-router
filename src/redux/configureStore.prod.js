import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import authentificationMiddleware from "./middlewares/autentificationMiddleware";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, authentificationMiddleware));
}
