import { combineReducers } from "redux";
import assessmentReducer from "./assessmentReducer";

export default combineReducers({
  assessment: assessmentReducer,
});
