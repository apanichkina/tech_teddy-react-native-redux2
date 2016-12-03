import * as types from './actionTypes';

export function pressConnectToDeviceButton(id):Action {
    return {
        type: types.PRESS_CONNECT_TO_DEVICE_BUTTON,
        id
    }
}

export function startConnectToDeviceButton():Action {
    return {
        type: types.START_CONNECT_TO_DEVICE_BUTTON_ACTION
    }
}

export function doneConnectToDeviceButton():Action {
    return {
        type: types.DONE_CONNECT_TO_DEVICE_BUTTON_ACTION
    }
}