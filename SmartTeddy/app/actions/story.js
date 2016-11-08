import * as types from './actionTypes';

export function seeStory(id:number):Action {
    return {
        type: types.SEE_STORY,
        id
    }
}
export function setStoriesResource(storiesResource:string):Action {
    return {
        type: types.SET_STORIES_RESOURCE,
        storiesResource
    }
}