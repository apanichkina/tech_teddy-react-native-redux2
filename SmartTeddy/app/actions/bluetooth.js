import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import { setBearStories, setConnectedBearName} from './bear'
import { pushNewRoute} from './route'

export function enableBluetooth():Action {
    return {
        type: types.ENABLE_BLUETOOTH
    };
}

export function disableBluetooth():Action {
    return {
        type: types.DISABLE_BLUETOOTH
    };
}
export function connectBluetooth():Action {
    return {
        type: types.CONNECT_BLUETOOTH
    };
}
export function isConnectedBluetooth():Action {
    return {
        type: types.ISCONNECTED_BLUETOOTH
    };
}
export function unconnectBluetooth():Action {
    return {
        type: types.UNCONNECT_BLUETOOTH
    };
}

export function receiveBears(devices):Action {
    let arr = devices;
    let bears=[];
    arr.forEach(function(item,i,arr){
            if(item.name.indexOf('HC-') >= 0) bears[item.id] = item;
        }
    );
    return {
        type: types.SEARCH_BEARS,
        devices: bears
    };
}

export function searchBears() {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.list().then(array => {console.log(array); dispatch(receiveBears(array))}
        ).catch((error) => {
                console.log('bear search error:');
                console.log(error)
            });
    }
}

export function connectToDevice(id, name) {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.connect(id).then(() => {
                disconnectFromDevice();
                dispatch(connectBluetooth());
                dispatch(setConnectedBearName(name));
                dispatch(pushNewRoute('bear-profile'));
                dispatch(setBearStories())
            }
        ).catch((error) => {
                console.log('connect ti device error:');
                console.log(error)
            });
    }
}

export function isConnectedToDevice() {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.isConnected().then(() => {
                dispatch(isConnectedBluetooth());
            }
        ).catch((error) => {
                console.log('disconnect from device error:');
                console.log(error)
            });
    }
}

export function disconnectFromDevice() {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.disconnect().then(() => {
                dispatch(unconnectBluetooth());
                dispatch(setConnectedBearName(''));
            }
        ).catch((error) => {
                console.log('disconnect from device error:');
                console.log(error)
            });
    }
}
