import {GET_PHOTO} from "../actions/types";

const INIT_STATE = {
  photo: {}
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case GET_PHOTO:
      return {
        ...state,
        photo: action.payload
      }
      break;
    default:
      return {
        ...state
      }
      break;
  }
}
