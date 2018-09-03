import axios from "axios";

import {ROOT_URL} from "../backend";
import {GET_LOCATIONS, GET_LOCATION, CREATE_LOCATION, UPDATE_LOCATION, CREATE_REVIEW, EDIT_REVIEW} from "./types";

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

export function createLocation(params, success, error){
  return function(dispatch) {
    axios.post(`${ROOT_URL}/locations`, params).then((r) => {
      const {errors, id} = r.data;
      if(!errors){
        dispatch({
          type: CREATE_LOCATION,
          payload: r.data
        });
        success(id);
      }else{
        error(Object.values(errors)[0]);
      }
    }).catch((e) => {
      error(e);
    })
  }
}

export function updateLocation(params, success, error){
  return function(dispatch){
    axios.put(`${ROOT_URL}/locations/${params.id}`, params).then((r) => {
      const {errors, id} = r.data;
      if(!errors){
        dispatch({
          type: UPDATE_LOCATION,
          payload: r.data
        });
        success(id);
      }else{
        error(Object.values(errors)[0]);
      }
    }).catch((e) => {
      error(e);
    });
  }
}

export function createReview(params, success, error){
  return function(dispatch){
    axios.post(`${ROOT_URL}/reviews`, params).then((r) => {
      if(!r.data.errors){
        dispatch({
          type: CREATE_REVIEW,
          payload: r.data
        });
        success();
      }else{
        error(Object.values(r.data.errors)[0]);
      }
    }).catch((e) => {
      error(e);
    })
  }
}

export function editReview(id, params, success, error){
  return function(dispatch){
    axios.put(`${ROOT_URL}/reviews/${id}`, params).then((r) => {
      if(!r.data.errors){
        dispatch({
          type: EDIT_REVIEW,
          payload: r.data
        });
        success();
      }else{
        error(Object.values(r.data.errors)[0]);
      }
    }).catch((e) => {
      error(e);
    });
  }
}
