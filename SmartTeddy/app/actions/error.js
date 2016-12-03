import * as types from './actionTypes';


export function setErrorVisible():Action {
    return {
        type: types.SET_ERROR_VISIBLE
    }
}
export function setErrorNotVisible():Action {
    return {
        type: types.SET_ERROR_NOT_VISIBLE
    }
}
export function setErrorMessage(message):Action {
    return {
        type: types.SET_ERROR_MESSAGE,
        message
    }
}
export function setError(message):Action {
    return {
        type: types.SET_ERROR,
        message
    }
}

