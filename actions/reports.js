import {SET_REPORT} from "./types";

export const setReport = (type) => {
  return{
    type: SET_REPORT,
    payload: type
  }
}
