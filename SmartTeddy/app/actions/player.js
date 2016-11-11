import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'

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

export function playStoryOnBear(id) {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.play(id).then(() => {dispatch(playStory(id))}
        ).catch((error) => {
                console.log('play story error:');
                console.log(error)
            });
    }
}
export function pauseStoryOnBear() {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.pause_unpause().then(() => {dispatch(pauseStory())}
        ).catch((error) => {
                console.log('pause story error:');
                console.log(error)
            });
    }
}
