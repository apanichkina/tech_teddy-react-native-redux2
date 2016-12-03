import * as types from './actionTypes';

export function isConnectedInternet(state:boolean):Action {
    return {
        type: types.IS_CONNECTED_INTERNET,
        state
    };
}
