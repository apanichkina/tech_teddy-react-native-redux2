import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask} from '../queue';

function uploadStory(id:number):Action {
    return {
        type: types.UPLOAD_STORY,
        id
    }
}
function deleteStory(id:number):Action {
    return {
        type: types.DELETE_STORY,
        id
    }
}
export function downloaded(bytes:number):Action {
    return {
        type: types.DOWNLOADED_STORY,
        bytes
    }
}
export function stopDowload():Action {
    return {
        type: types.STOP_DOWNLOAD
    }
}

export function uploadStoryToBear(id) {
    return function (dispatch) {
        addUserTask('uploadStoryToBear', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.downloadFile(id);
            },
            function () {
                console.log('onStart uploadStoryToBear')
            },
            () => {
                dispatch(uploadStory(id))
            },
            (error) => {
                console.log('upload story error:');
                console.log(error);
            }
        );
    }
}

export function deleteStoryFromBear(id) {
    return function (dispatch) {
        addUserTask('deleteStoryFromBear', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.removeFile(id);
            },
            function () {
                console.log('onStart deleteStoryFromBear')
            },
            () => {
                dispatch(deleteStory(id))
            },
            (error) => {
                console.log('delete story error:');
                console.log(error);
            }
        );
    }
}

