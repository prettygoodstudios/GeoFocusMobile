import axios from "axios";

import {ROOT_URL} from "../backend";
import {GET_LOCATIONS} from "./types";

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
