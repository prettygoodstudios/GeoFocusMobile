import {LOG_IN, AUTHENTICATE, CLEAR_USER, CREATE_USER} from "../actions/types";

const INIT_STATE = {
  user: {
    authenticated: false
  }
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case CREATE_USER:
    case AUTHENTICATE:
    case LOG_IN:
      return{
        ...state,
        user: {
          ...action.payload,
          authenticated: true
        }
      }
    case CLEAR_USER:
      return{
        ...state,
        user: action.payload
      }
    default:
      return{
        ...state
      }
  }

}
