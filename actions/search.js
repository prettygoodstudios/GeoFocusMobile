import {SEARCH_RESULTS, SEARCH_ACTIVATED} from "./types";

export function setResults(results){
  return{
    type: SEARCH_RESULTS,
    payload: results
  }
}

export function setSearching(searching){
  return{
    type: SEARCH_ACTIVATED,
    payload: searching
  }
}
