import {GET_LOCATIONS, GET_LOCATION, CREATE_LOCATION} from "../actions/types";

const INIT_STATE = {
  locations: [],
  location: {}
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case GET_LOCATION:
      return{
        ...state,
        location: action.payload
      }
      break;
    case GET_LOCATIONS:
      return{
        ...state,
        locations: action.payload
      }
      break;
    case CREATE_LOCATION:
      return{
        ...state,
        location: action.payload
      }
    default:
      return{
        ...state
      }
  }

}
