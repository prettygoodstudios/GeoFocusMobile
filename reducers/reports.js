import {SET_REPORT} from "../actions/types";

const INIT_STATE = {
  content: {}
}

export default function(state = INIT_STATE, action){
  switch (action.type) {
    case SET_REPORT:
      return{
        ...state,
        content: action.payload
      }
    default:
      return{
        ...state
      }
  }
}
