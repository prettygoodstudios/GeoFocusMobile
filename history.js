import { createMemoryHistory } from 'history';
import {setScrollY} from "./actions";
const history = createMemoryHistory({});

export function goBack(){
  return history.push(history.entries[history.entries.length-2].pathname);
}

export function redirectAndResetScroll(path){
  setScrollY(0);
  history.push(path);
}

export default history;
