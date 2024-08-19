import { DetailReducers } from "./app1/store";
import { mainReducers } from "./reducer";
import { combineReducers } from "redux";

console.log("Main", mainReducers);
const rootReducer = combineReducers({
  auth: DetailReducers,
  main: mainReducers,
});

export default rootReducer;
