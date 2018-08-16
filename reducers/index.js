import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";
import loading from "./loading";

const rootReducer = combineReducers({
  auth,
  locations,
  loading
});

export default rootReducer;
