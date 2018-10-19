import { combineReducers } from 'redux';

import auth from "./auth";
import locations from "./locations";
import loading from "./loading";
import users from "./users";
import photos from "./photos";
import scrolling from "./scrolling";
import padding from "./padding";

const rootReducer = combineReducers({
  auth,
  locations,
  loading,
  users,
  photos,
  scrolling,
  padding
});

export default rootReducer;
