import {SET_SCROLL} from "../actions/types";

const INIT_STATE = {
  scroll: true
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case SET_SCROLL:
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
