import {SET_PADDING} from "../actions/types";

const INIT_STATE = {
  padding: 20
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case SET_PADDING:
      return{
        ...state,
        padding: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
