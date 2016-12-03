import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask} from '../queue';
import {setBearStories} from './bear'
import {fetchStories} from './interactiveStories'
function uploadStory(id:number, size:number):Action {
    return {
        type: types.UPLOAD_STORY,
        id,
        size
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
export function stopDowloadState():Action {
    return {
        type: types.STOP_DOWNLOAD
    }
}
export function finishProgress():Action {
    return {
        type: types.FINISH_PROGRESS
    }
}
export function stopDowload():Action {
    return function (dispatch) {
        dispatch(finishProgress());
        setTimeout(() =>  dispatch(stopDowloadState()), 1000)
    }
}


export function uploadStoryToBear(id) {
    return function (dispatch, getState) {
        //
        let uploadedStory = getState().userStories.stories[id];
        if (uploadedStory.category  == 4) {
            console.log('find INteractive story name:'+uploadedStory.name);
            dispatch(fetchStories(uploadedStory.id));
        }
        else {
            let uploadedSize = uploadedStory.size_m;
            addUserTask('uploadStoryToBear', ()=> {
                    let instance = Bluetooth.getInstance();
                    return instance.downloadFile(id);
                },
                function () {
                    console.log('onStart uploadStoryToBear')
                },
                () => {
                    dispatch(uploadStory(id, uploadedSize))
                },
                (error) => {
                    console.log('upload story error:');
                    console.log(error);
                }
            );
        }
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
                dispatch(setBearStories())
            },
            (error) => {
                console.log('delete story error:');
                console.log(error);
            }
        );
    }
}

