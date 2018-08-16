import {SET_LOADING} from "./types";

export function setLoading(state){
  return{
    type: SET_LOADING,
    payload: state
  }
}
