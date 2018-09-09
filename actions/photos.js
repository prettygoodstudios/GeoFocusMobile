import axios from "axios";

import {ROOT_URL} from "../backend";
import {GET_PHOTO, UPLOAD_PHOTO} from "./types";

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

export function uploadPhoto(params, success, error){
  return function(dispatch){
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(`${ROOT_URL}/photos`, params, headers).then((r) => {
      if(!r.data.errors){
        dispatch({
          type: UPLOAD_PHOTO,
          payload: r.data
        });
        success(r.data.id);
      }else{
        error(Object.values(r.data.errors)[0]);
      }
    }).catch((e) => {
      error(e);
    });
  }
}
