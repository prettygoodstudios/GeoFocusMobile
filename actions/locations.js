import axios from "axios";

import {ROOT_URL} from "../backend";
import {GET_LOCATIONS, GET_LOCATION} from "./types";

export function getLocations(success, error){
  return function(dispatch){
    axios.get(`${ROOT_URL}/locations`).then((r) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: r.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}


export function getLocation(id, success, error){
  return function(dispatch){
    axios.get(`${ROOT_URL}/locations/${id}`).then((r) => {
      dispatch({
        type: GET_LOCATION,
        payload: r.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}
