import {GET_LOCATIONS} from "../actions/types";

const INIT_STATE = {
  locations: []
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case GET_LOCATIONS:
      return{
        ...state,
        locations: action.payload
      }
    default:
      return{
        ...state
      }
  }

}
