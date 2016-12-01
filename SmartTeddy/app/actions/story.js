import * as types from './actionTypes';

export function seeStory(id:number):Action {
    return {
        type: types.SEE_STORY,
        id
    }
}