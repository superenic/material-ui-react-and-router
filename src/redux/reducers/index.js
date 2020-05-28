import { combineReducers } from "redux";
import listReducer from "../../components/testing/reducers/listReducer";
import apiCallStatusReducer from "./apiStatusReducer";
import session from "./session";
import webLoad from './webLoad';

const rootReducer = combineReducers({
    apiCallStatusReducer,
    listReducer,
    session,
    webLoad,
});

export default rootReducer;
