import {SEARCH_RESULTS, SEARCH_ACTIVATED} from "../actions/types";

const INIT_STATE = {
  activated: false,
  results: []
}

export default function(state = INIT_STATE, action){
  switch(action.type){
    case SEARCH_RESULTS:
      return{
        ...state,
        results: action.payload
      }
    case SEARCH_ACTIVATED:
      return{
        ...state,
        activated: action.payload
      }
    default:
      return{
        ...state
      }
  }
}
