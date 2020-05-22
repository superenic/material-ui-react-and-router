import { combineReducers } from "redux";
import listReducer from "../../components/testing/reducers/listReducer";
import apiCallStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
    apiCallStatusReducer,
    listReducer,
});

export default rootReducer;
