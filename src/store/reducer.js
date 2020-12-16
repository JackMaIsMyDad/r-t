import { combineReducers } from "redux-immutable";
import { user } from "./modules/user";

const reducer = combineReducers({
  user
});

export default reducer;
