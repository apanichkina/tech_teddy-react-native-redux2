import * as types from './actionTypes';

export function increment():Action {
  return {
    type: types.INCREMENT
  };
}

export function decrement():Action {
  return {
    type: types.DECREMENT
  };
}
