import * as types from './actionTypes';

export function pressPlayButton(id):Action {
    return {
        type: types.PRESS_PLAY_BUTTON,
        id
    }
}

export function startPlayButton():Action {
    return {
        type: types.START_PLAY_ACTION
    }
}

export function donePlayButton():Action {
    return {
        type: types.DONE_PLAY_ACTION
    }
}