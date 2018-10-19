import {SET_PADDING} from "./types";

export function setPadding(padding){
  return{
    type: SET_PADDING,
    payload: padding
  }
}
