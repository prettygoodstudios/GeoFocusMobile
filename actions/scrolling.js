import {SET_SCROLL, SET_SCROLL_Y} from "./types";

export function setScroll(val){
  return{
    type: SET_SCROLL,
    payload: val
  }
}

export function setScrollY(val){
  type: SET_SCROLL_Y
  payload: val
}
