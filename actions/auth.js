import axios from "axios";

import {LOG_IN, AUTHENTICATE, CLEAR_USER} from "./types";
import {ROOT_URL} from "../backend";

export function logIn(params, success, error){
  return function(dispatch){
    axios.post(`${ROOT_URL}/sessions`,params).then((r) => {
      dispatch({
        type: LOG_IN,
        payload: r.data
      });
      success(r.data);
    }).catch((e) => {
      error(e);
    });
  }
}

export function clearUser(){
  return {
    type: CLEAR_USER,
    payload: {
      authenticated: false
    }
  }
}

export function authenticate(params, success, error){
  return function(dispatch){
    axios.post(`${ROOT_URL}/sessions/authenticate`, params).then((r) => {
      dispatch({
        type: AUTHENTICATE,
        payload: r.data
      });
      success(r.data);
    }).catch((e) => {
      error("Your session has expired.");
    });
  }
}
