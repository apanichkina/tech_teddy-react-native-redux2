import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask} from '../queue';
import {setBearStories} from './bear'
import {fetchStories} from './interactiveStories'
import {setError} from './error'
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
export function uploadHardcodeStoryToBear(id) {
    return function (dispatch, getState) {

            addUserTask('uploadStoryToBear', ()=> {
                    let instance = Bluetooth.getInstance();
                    return instance.downloadFile(id);
                },
                function () {
                    console.log('onStart uploadStoryToBear')
                },
                () => {
                    dispatch(uploadStory(id, 100000))
                },
                (error) => {
                    dispatch(setError('Ошибка. Попробуйте снова'));
                    console.log('upload story error:');
                    console.log(error);
                }
            );
    }
}

export function uploadStoryToBear(id) {
    return function (dispatch, getState) {
        //
        let uploadedStory = getState().userStories.stories[id];
        let count = uploadedStory.roled ? uploadedStory.story_parts.length : 1;
        //let uploadedSize = uploadedStory.size;
        let uploadedSize = uploadedStory.story_parts[0].size;
            addUserTask('uploadStoryToBear', ()=> {
                    let instance = Bluetooth.getInstance();
                    return instance.downloadFile(id, count);
                },
                function () {
                    console.log('onStart uploadStoryToBear'+id)
                },
                () => {
                    dispatch(uploadStory(id, uploadedSize))
                },
                (error) => {
                    dispatch(setError('Ошибка. Повторите попытку'));
                    console.log('upload story error:'+id);
                    console.log(error);
                }
            );

    }
}

export function deleteStoryFromBear(id) {
    return function (dispatch, getState) {
        let uploadedStory = getState().userStories.stories[id];
        let count = uploadedStory.roled ? uploadedStory.story_parts.length : 1;
        console.log(count);
        addUserTask('deleteStoryFromBear', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.removeFile(id, count);
            },
            function () {
                console.log('onStart deleteStoryFromBear'+id)
            },
            () => {
                dispatch(setBearStories())
            },
            (error) => {
                dispatch(setError('Ошибка. Повторите попытку'));
                console.log('delete story error:'+id);
                console.log(error);
            }
        );
    }
}

