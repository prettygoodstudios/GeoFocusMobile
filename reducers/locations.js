import {GET_LOCATIONS, GET_LOCATION, CREATE_LOCATION, UPDATE_LOCATION, CREATE_REVIEW, EDIT_REVIEW, SET_MY_LOCATION} from "../actions/types";

const INIT_STATE = {
  locations: [],
  location: {},
  myLocation: {}
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case SET_MY_LOCATION:
      return{
        ...state,
        myLocation: action.payload
      }
    case GET_LOCATIONS:
      return{
        ...state,
        locations: action.payload
      }
    case CREATE_REVIEW:
    case EDIT_REVIEW:
    case CREATE_LOCATION:
    case UPDATE_LOCATION:
    case GET_LOCATION:
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
