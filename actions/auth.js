import axios from "axios";

import {LOG_IN} from "./types";
import {ROOT_URL} from "../backend";

export function logIn(params, success, error){
  return function(dispatch){
    axios.post(`${ROOT_URL}/sessions`,params).then((r) => {
      dispatch({
        type: LOG_IN,
        payload: r.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}
