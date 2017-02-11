import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask} from '../queue';
import {startPlayButton, donePlayButton} from './playerButtons'
import {setError} from './error'

export function playStory(id):Action {
    return {
        type: types.PLAY_STORY,
        id
    }
}

export function pauseBearStory(id):Action {
    return {
        type: types.BEAR_PLAYER_PAUSED,
        id
    }
}
export function pauseStory():Action {
    return {
        type: types.PAUSE_STORY
    }
}

export function stopStory():Action {
    return {
        type: types.STOP_STORY
    }
}

export function playStoryOnBear(id) {

    return function (dispatch) {
        addUserTask('playStoryOnBear:'+id, ()=> {
                let instance = Bluetooth.getInstance();
                return instance.play(id);
            },
            function () {
                dispatch(startPlayButton())
                //dispatch(playStory(id))
            },
            (array) => {
                dispatch(donePlayButton());
                dispatch(playStory(id))
            },
            (error) => {
                dispatch(donePlayButton());
                dispatch(setError('Ошибка воспроизведения'));
                console.log('play story error:');
                console.log(error);
            },
            ()=>{  dispatch(startPlayButton());  dispatch(donePlayButton());}
        );
    }
}
export function pauseStoryOnBear() {

    return function (dispatch) {
        addUserTask('pauseStoryOnBear', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.pause_unpause();
            },
            function () {

            },
            (array) => {
                dispatch(pauseStory())
            },
            (error) => {
                console.log('pause story error:');
                console.log(error);
            }
        );
    }
}

export function stopStoryOnBear() {

    return function (dispatch) {
        addUserTask('stopStoryOnBear', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.stopStory();
            },
            function () {

            },
            (array) => {
               // dispatch(pauseStory())
            },
            (error) => {
                console.log('stop story error:');
                console.log(error);
            }
        );
    }
}