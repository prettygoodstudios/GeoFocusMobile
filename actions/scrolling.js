import {SET_SCROLL} from "./types";

export function setScroll(val){
  return{
    type: SET_SCROLL,
    payload: val
  }
}
