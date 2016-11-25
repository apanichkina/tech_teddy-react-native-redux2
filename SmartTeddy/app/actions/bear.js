import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'

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
    console.log('dirty stories: ');
    console.log(arr);
    let bearStories=[];
    let index = 0;
    let item_number = 0;
    arr.forEach(function(item,i,arr){
            item=item.replace(".raw","");
            item_number = parseInt(item,10);
            if (item_number){
            bearStories[index++] = item_number;
            }
        }
    );
    console.log('clear stories: ');
    console.log(bearStories);
    let result = getFullStoryInformation(allStories,bearStories);
    console.log('|||||||||');
    console.log(result);
    return {
        type: types.SET_BEAR_STORIES,
        stories: result
    }
}
export function setConnectedBearName(name:string):Action {
    console.log('setConnectedBearName', name);
    return {
        type: types.SET_CONNECTED_BEAR_NAME,
        name
    }
}

export function setBearStories() {

    let instance = Bluetooth.getInstance();
    return function (dispatch, getState) {
        let stories = getState().userStories.stories;
        dispatch(requestBearStories());
        return instance.getStoryList().then(array => {dispatch(receiveStories(stories,array))}
        ).catch((error) => {
                dispatch(requestBearStoriesFailed());
                console.log('bear stories error:');
                console.log(error)
            });
    }
}
export function uploadStory(id:number):Action {
    return {
        type: types.UPLOAD_STORY,
        id
    }
}
export function downloadedStory(bytes:number):Action {
    return {
        type: types.DOWNLOADED_STORY,
        bytes
    }
}
export function deleteStory(id:number):Action {
    return {
        type: types.DELETE_STORY,
        id
    }
}


export function alarmIsPlaying():Action {
    return {
        type: types.ALARM_IS_PLAYING
    }
}

export function uploadStoryToBear(id) {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.downloadFile(id).then(() => {dispatch(uploadStory(id))}
        ).catch((error) => {
                console.log('upload story error:');
                console.log(error)
            });
    }
}

export function deleteStoryFromBear(id) {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.removeFile(id).then(() => {dispatch(deleteStory(id))}
        ).catch((error) => {
                console.log('delete story error:');
                console.log(error)
            });
    }
}

