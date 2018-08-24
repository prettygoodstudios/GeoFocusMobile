import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";
import loading from "./loading";
import users from "./users";
import photos from "./photos";

const rootReducer = combineReducers({
  auth,
  locations,
  loading,
  users,
  photos
});

export default rootReducer;
