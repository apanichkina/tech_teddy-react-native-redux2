import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'

export function requestBearStories():Action {
    return {
        type: types.REQUEST_BEAR_STORIES
    }
}
export function receiveStories(stories):Action {
    let arr = stories;
    console.log('dirty stories: ');
    console.log(arr);
    let bearStories=[];
    let index = 0;
    arr.forEach(function(item,i,arr){
            if (item){
            item=item.replace(".raw","");
            bearStories[index++] = parseInt(item,10);
            }
        }
    );
    console.log('clear stories: ');
    console.log(arr);
    return {
        type: types.SET_BEAR_STORIES,
        stories: bearStories
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
    return function (dispatch) {
        dispatch(requestBearStories());
        return instance.getStoryList().then(array => {dispatch(receiveStories(array))}
        ).catch((error) => {
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
        type: types.ALARM_IS_PLAYING,
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

