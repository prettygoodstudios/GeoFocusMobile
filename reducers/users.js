import {GET_USER} from "../actions/types";

const INIT_STATE = {
  selectedUser: {}
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case GET_USER:
      return{
        ...state,
        selectedUser: action.payload
      }
      break;
    default:
      return {
        ...state
      }
      break;
  }
}
