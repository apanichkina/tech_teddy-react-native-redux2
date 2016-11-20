import * as types from './actionTypes';

export function openModal():Action {
    return {
        type: types.OPEN_MODAL
    };
}

export function closeModal():Action {
    return {
        type: types.CLOSE_MODAL
    };
}

export function setModalMessage(text:string):Action {
    return {
        type: types.SET_MODAL_MESSAGE,
        text
    };
}
