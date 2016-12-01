import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask} from '../queue';

export function playStory(id:number):Action {
    return {
        type: types.PLAY_STORY,
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
        addUserTask('playStoryOnBear', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.play(id);
            },
            function () {
                console.log('onStart playStoryOnBear')
            },
            (array) => {
                dispatch(playStory(id))
            },
            (error) => {
                console.log('play story error:');
                console.log(error);
            }
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
                console.log('onStart pauseStoryOnBear')
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
