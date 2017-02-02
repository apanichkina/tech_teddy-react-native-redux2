import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask} from '../queue';
import {setBearStories} from './bear'
import {setError} from './error'
import {stopStory} from './player'
function uploadStory(id:number, size:number, sizes):Action {
    return {
        type: types.UPLOAD_STORY,
        id,
        size,
        sizes
    }
}
function deleteStory(id:number):Action {
    return {
        type: types.DELETE_STORY,
        id
    }
}
export function downloaded(bytes:number, id):Action {
    return {
        type: types.DOWNLOADED_STORY,
        bytes,
        id
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
                function () {},
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
        if (getState().bearStory.downloadingStoryId != -1) {
            dispatch(setError('Запрещено одновременное скачивание нескольких сказок'));
        } else {
            let uploadedStory = getState().userStories.stories[id];
            let stories = uploadedStory.story_parts;
            let count = uploadedStory.story_parts.length;
            let sizes = [];
            sizes[0]=0;
            let value = 0;
            for (let i = 1; i < count; ++i) {
                value += stories[i-1].size;
                sizes[i] = value;
            }
            let fullSize = value + stories[count-1].size;

                addUserTask('uploadStoryToBear', ()=> {
                        let instance = Bluetooth.getInstance();
                        return instance.downloadFile(id, count);
                    },
                    function () {},
                    () => {
                        console.log(fullSize);
                        console.log(sizes);
                        dispatch(uploadStory(id, fullSize, sizes))
                    },
                    (error) => {
                        dispatch(setError('Ошибка. Повторите попытку'));
                        console.log('upload story error:'+id);
                        console.log(error);
                    }
                );
            }
    }
}

export function deleteStoryFromBear(id) {
    return function (dispatch, getState) {
        let uploadedStory = getState().userStories.stories[id];
        let count = uploadedStory.story_parts.length;
        addUserTask('deleteStoryFromBear', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.removeFile(id, count);
            },
            function () {
                console.log('onStart deleteStoryFromBear'+id)
            },
            () => {
                dispatch(deleteStory(id));
                dispatch(setBearStories());
                if (getState().player.storyId == id) {
                    dispatch(stopStory());
                }
            },
            (error) => {
                dispatch(setError('Ошибка. Повторите попытку'));
                console.log('delete story error:'+id);
                console.log(error);
            }
        );
    }
}

