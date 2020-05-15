import {combineReducers} from "redux";

import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import trackerReducer from "./trackerReducers";
import miscReducer from "./miscReducers";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    tracker: trackerReducer,
    misc: miscReducer
})