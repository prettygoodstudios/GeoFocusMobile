import {GET_PHOTO, UPLOAD_PHOTO} from "../actions/types";

const INIT_STATE = {
  photo: {}
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case UPLOAD_PHOTO:
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
