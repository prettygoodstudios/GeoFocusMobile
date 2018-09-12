import axios from "axios";

import {LOG_IN, AUTHENTICATE, CLEAR_USER, CREATE_USER} from "./types";
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

export function createUser(params, success, error){
  return function(dispatch){
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(`${ROOT_URL}/sessions/create_user`, params, headers).then((r) => {
      if(!r.data.errors){
        dispatch({
          type: CREATE_USER,
          payload: r.data
        });
        success(r.data);
      }else{
        const key = Object.keys(r.data.errors)[0];
        const message = Object.values(r.data.errors)[0];
        error(`${key.charAt(0).toUpperCase()}${key.slice(1)} ${message}.`);
      }
    }).catch((e) => {
      error(e);
    });
  }
}
