import {LOG_IN, AUTHENTICATE } from "../actions/types";

const INIT_STATE = {
  user: {
    authenticated: false
  }
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case AUTHENTICATE:
    case LOG_IN:
      return{
        ...state,
        user: {
          ...action.payload,
          authenticated: true
        }
      }
    default:
      return{
        ...state
      }
  }

}
