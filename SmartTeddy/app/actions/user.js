import * as types from './actionTypes';

export function setToken(token:string):Action {
    return {
        type: types.SET_USER_TOKEN,
        token
    }
}
