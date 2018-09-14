import axios from "axios";

import {GET_USER} from "./types";
import {ROOT_URL} from "../backend";
import {parseNetworkErrors} from "../helpers/errors";

export function getUser(id, success, error){
  return function(dispatch){
    axios.get(`${ROOT_URL}/users/${id}`).then((r) => {
      dispatch({
        type: GET_USER,
        payload: r.data
      });
      success();
    }).catch((e) => {
      error(parseNetworkErrors(e));
    });
  }
}
