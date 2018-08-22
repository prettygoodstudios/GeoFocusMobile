import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";
import loading from "./loading";
import users from "./users";

const rootReducer = combineReducers({
  auth,
  locations,
  loading,
  users
});

export default rootReducer;
