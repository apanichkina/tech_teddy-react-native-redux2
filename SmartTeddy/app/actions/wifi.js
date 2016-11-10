import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'

export function setWiFiPassword(password:string):Action {
    return {
        type: types.SET_WIFI_PASSWORD,
        password
    }
}

export function setWiFiSSID(ssid:string):Action {
    return {
        type: types.SET_WIFI_SSID,
        ssid
    }
}

export function toggleWiFiActive(value:boolean):Action {
    return {
        type: types.TOGGLE_WIFI_ACTIVE,
        value
    }
}
export function setWiFi () {
    let instance = Bluetooth.getInstance();
    return function (dispatch,getState) {
        return instance.setWiFi()
            .then((res) => {
                let state = getState();
                dispatch(setWiFiSSID(state.wifi.wifiSSID));
                dispatch(setWiFiPassword(state.wifi.wifiPassword));
                console.log(res);
                console.log('setWiFi');
                //E.long(res, 'setWiFi')

            })
            .catch((error) => {
                console.log(error);
                console.log('setWiFi');
                //E.long(error, 'setWiFi')
            });
    }
}

export function toggleWiFi () {
    let instance = Bluetooth.getInstance();
    return function (dispatch) {
        return instance.toggleWiFi()
            .then((res) => {
                let currentState = false;
                if (res == 'on') currentState = true;
                dispatch(toggleWiFiActive(currentState));
                console.log(res);
                console.log('toggleWiFi');
                // E.long(res, 'toggleWiFi')
            })
            .catch((error) => {
                console.log(error);
                console.log('toggleWiFi');
                //E.long(error, 'toggleWiFi')
            });
    }
}