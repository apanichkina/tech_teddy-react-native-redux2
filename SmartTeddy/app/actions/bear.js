import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask} from '../queue';

function requestBearStories():Action {
    return {
        type: types.REQUEST_BEAR_STORIES
    }
}

function requestBearStoriesFailed():Action {
    return {
        type: types.SET_BEAR_STORIES_FAILED
    }
}

function getFullStoryInformation(stories, indexes){
    let fullStories = [];
    let story = {};
    let storiesCount = indexes.length;
    for (var i = 0; i < storiesCount; ++i) {

        fullStories[i] = stories[indexes[i]];
    }
    fullStories = fullStories.filter(function(n){ return n != undefined });
    return fullStories;
}
function receiveStories(allStories,stories):Action {
    let arr = stories;
    let bearStories=[];
    let index = 0;
    let item_number = 0;
    arr.forEach(function(item,i,arr){
            item=item.replace(".raw","");
            item_number = parseInt(item,10);

            if (item_number && (bearStories.indexOf(item_number) == -1)) {
            bearStories[index++] = item_number;
            }
        }
    );
    let result = getFullStoryInformation(allStories,bearStories);
    return {
        type: types.SET_BEAR_STORIES,
        stories: result
    }
}
export function setConnectedBear(name:string, id:string):Action {
    return {
        type: types.SET_CONNECTED_BEAR,
        name,
        id
    }
}

export function setBearStories() {
    return function (dispatch, getState) {
        let stories = getState().userStories.stories;
        dispatch(requestBearStories());
        addUserTask('setBearStories',()=>{ let instance = Bluetooth.getInstance(); return instance.getStoryList(); },
            function(){},
            (array) => {dispatch(receiveStories(stories,array))},
            (error) => {
                dispatch(requestBearStoriesFailed());
                console.log('bear stories error:');
                console.log(error)
            }
        );

    }
}


