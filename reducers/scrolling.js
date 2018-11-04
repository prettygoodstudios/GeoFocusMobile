import {SET_SCROLL, SET_SCROLL_Y} from "../actions/types";

const INIT_STATE = {
  scroll: true,
  scrollY: false
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case SET_SCROLL:
      return{
        ...state,
        scroll: action.payload
      }
    case SET_SCROLL_Y:
      return{
        ...state,
        scroll: action.payload
      }
    default:
      return{
        ...state
      }
  }
}
