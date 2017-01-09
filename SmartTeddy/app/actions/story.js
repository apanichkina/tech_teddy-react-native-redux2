import * as types from './actionTypes';

export function seeStory(id):Action {
    return {
        type: types.SEE_STORY,
        id
    }
}