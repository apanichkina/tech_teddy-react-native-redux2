import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'

export function receiveStories(stories):Action {
    let arr = stories;
    let bearStories=[];
    arr.forEach(function(item,i,arr){
            item=item.replace(".raw","");
            bearStories[i] = parseInt(item,10);
        }
    );
    return {
        type: types.SET_BEAR_STORIES,
        stories: bearStories
    }
}
export function setConnectedBearName(name:string):Action {
    return {
        type: types.SET_CONNECTED_BEAR_NAME,
        name
    }
}

export function setBearStories() {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
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
export function deleteStory(id:number):Action {
    return {
        type: types.DELETE_STORY,
        id
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

