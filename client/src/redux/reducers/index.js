import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";

const rootReducer = combineReducers({
  isLogged: LoginReducer,
});

export default rootReducer;
