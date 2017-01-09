import * as types from './actionTypes';

export function seeSubStory(id):Action {
    return {
        type: types.SEE_SUB_STORY,
        id
    }
}
