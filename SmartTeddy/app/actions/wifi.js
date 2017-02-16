import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {setError} from './error'
import {addUserTask,addSystemTask } from '../queue';
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
export function toggleWiFiActiveUnknown():Action {
    return {
        type: types.TOGGLE_WIFI_ACTIVE_UNKNOWN
    }
}
//TODO удалить вывод в консоль
export function setWiFi (ssid, password='') {
   // console.log('wifisetaction',ssid,password);
    return function (dispatch, getState) {
       // console.log('wifisetaction',ssid,password);
        addUserTask('setWiFi',()=>{ let instance = Bluetooth.getInstance(); return instance.setWiFi(ssid, password); },
            function(){},
            (res) => {
                //let state = getState();
                //dispatch(setWiFiSSID(ssid));
                //dispatch(setWiFiPassword(password));
                dispatch(discardWiFi())
                //console.log(res);
                //console.log('setWiFi');
                //E.long(res, 'setWiFi')

            },
            (error) => {
                dispatch(discardWiFi())
                console.log(error);
                console.log('setWiFi error!!!!!!!');
                dispatch(setError('Ошибка установки WiFi'));
            }
        );
    }
}

export function toggleWiFi() {
    return function (dispatch, getState) {
        // let stories = getState().userStories.stories;
        dispatch(requestWiFiList());
        addUserTask('toggleWiFi',()=>{ let instance = Bluetooth.getInstance(); return instance.toggleWiFi(); },
            function(){},
            (res) => {
                let currentState = false;
                if (res == 'on') currentState = true;
                dispatch(toggleWiFiActive(currentState));
                //console.log(res);
                //console.log('toggleWiFi');

            },
            (error) => {
                console.log(error);
                console.log('toggleWiFi');
            }
        );

    }
}


function requestWiFiList():Action {
    return {
        type: types.REQUEST_WIFI_LIST
    }
}
function checkName(list,name) {
    let result = false;
    list.forEach(function (item) {
        if (item.name == name) result = true;
    })
    return result;
}
function receiveWiFiList(wifiListDef):Action {
    let list = [];
    wifiListDef.forEach(function (item, index, array) {
        item = item.split(':');
        let temp = {};
        let name = item[0];
        if (!checkName(list,name)) {
            temp.name = name;
            let signal = item[1];
            if (temp.name && signal) {
                if (signal > -44) {
                    temp.signal = 3;
                } else {
                    if (signal > -90) {
                        temp.signal = 2;
                    } else {
                        temp.signal = 1;
                    }
                }
                list.push(temp)
            }
        }


    });
    return {
        type: types.RECEIVE_WIFI_LIST,
        list: list
    }
}
function requestWiFiListFail():Action {
    return {
        type: types.REQUEST_WIFI_LIST_FAIL
    }
}
export function getWiFiList() {
    return function (dispatch, getState) {
        // let stories = getState().userStories.stories;
        dispatch(requestWiFiList());
        addUserTask('getWifiList',()=>{ let instance = Bluetooth.getInstance(); return instance.getWiFi(); },
            function(){},
            (array) => {
                dispatch(receiveWiFiList(array));
            },
            (error) => {
                dispatch(requestWiFiListFail());
                //dispatch(toggleWiFiActive(false));
                console.log('wifi list error:');
                console.log(error)
            }
        );

    }
}
export function setModalVisibility(state:bool):Action {
    return {
        type: types.SET_MODAL_VISIBILITY,
        state
    }
}

export function setConnectedWiFiSSID(ssid:string):Action {
    return {
        type: types.SET_CONNECTED_WIFI_SSID,
        ssid
    }
}
export function discardWiFi():Action {
    return {
        type: types.DISCARD_WIFI
    }
}
export function setIsFetchingWiFi(value:bool):Action {
    return {
        type: types.SET_WIFI_FETCHING,
        value
    }
}

export function setWiFiStatus(status, ssid:string):Action {
    return {
        type: types.SET_WIFI_STATUS,
        ssid,
        status
    }
}
