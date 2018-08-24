import axios from "axios";

import {ROOT_URL} from "../backend";
import {GET_PHOTO} from "./types";

export function getPhoto(id, success, error){
  return function(dispatch){
    axios.get(`${ROOT_URL}/photos/${id}`).then((r) => {
      dispatch({
        type: GET_PHOTO,
        payload: r.data
      });
      success();
    }).catch((e) => {
      error(e);
    });
  }
}
