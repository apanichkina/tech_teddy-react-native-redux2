import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {alarmIsPlaying} from './alarm'
import {setError} from './error'
import {downloaded, uploadStoryToBear, deleteStory} from './bearStory'
import { setBearStories, setConnectedBear } from './bear'
import {playStory, pauseStory, pauseBearStory, stopStory}from './player'
import {donePlayButton} from './playerButtons'
import { pushNewRoute} from './route'
import { toggleWiFiActive, setConnectedWiFiSSID } from './wifi'
import {addUserTask, addSystemTask} from '../queue';
import {stopDowload} from './bearStory'
import {replaceRoute} from './route'
import {startConnectToDeviceButton, doneConnectToDeviceButton} from './connectToDeviceButton'
var heartBeatID = undefined;

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
        return instance.list().then(array => {{console.log(array);dispatch(receiveBears(array))}}
        ).catch((error) => {
                console.log('bear search error:');
                console.log(error)
            });
    }
}

export function connectToDevice(id, name) {

    return function (dispatch, getState) {
            addUserTask('connect', ()=>{
                    let instance = Bluetooth.getInstance();
                    return instance.connect(id);
                },
                function () {
                    dispatch(startConnectToDeviceButton())
                },
                function (result) {
                    dispatch(connectBluetooth());
                    dispatch(setConnectedBear(name,id));
                    heartBeatID = setTimeout(() => {
                        //heartBeatID = undefined;
                        //heartBeat()(dispatch);

                        //СИНХРОНИЗАЦИЯ ВРЕМЕНИ -------- ЖЕСТЬ КАК ДОЛГО
                        syncTime()
                            .then(()=>{
                                heartBeatID = undefined;
                                heartBeat()(dispatch, getState);
                                dispatch(doneConnectToDeviceButton());
                                dispatch(replaceRoute('bear-profile'));
                            })
                            .catch((err)=>{
                                dispatch(doneConnectToDeviceButton());
                                dispatch(replaceRoute('bear-profile'));
                                console.log('syncTime failed', err);})

                    }, 1000);
                },
                (error) => {
                    dispatch(doneConnectToDeviceButton());
                    dispatch(setError('Не удалось подключиться'));
                    console.log('connect ti device error:');
                    console.log(error);
                }
            );
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
                // if (heartBeatID) {
                //     heartBeatID = clearTimeout(heartBeatID);
                // }
                dispatch(unconnectBluetooth());
                dispatch(setConnectedBear('',''));
            }
        ).catch((error) => {
                console.log('disconnect from device error:');
                console.log(error)
            });
    }
}

export function heartBeat() {
    return function (dispatch, getState) {

        addSystemTask('heartBeat', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.shortPolling();
            },
            function () {

            },
            (array) => {
                for (var i = 0; i < array.length; ++i) {
                    var code = array[i][0];
                    var body = array[i].substring(1);
                    switch (code) {
                        case 'a':
                        {
                            dispatch(alarmIsPlaying());
                            //console.log('alarm: ', body);
                        }
                            break;
                        case 's':
                        {
                            //dispatch(playStory(body));
                            if (body == 'top') {
                                dispatch(stopStory());
                            } else {
                                dispatch(donePlayButton());
                                dispatch(playStory(body));
                            }
                            //console.log('story: ' + body +' is playing');
                        }
                            break;
                        case 'p':
                        {
                            dispatch(pauseBearStory(body));
                            //console.log('story: ' + body + ' is paused');
                        }
                            break;
                        case 'r':
                        {
                            // dispatch(speakRole(body));
                            //console.log('hero: ' + body + ' is speaking');
                        }
                            break;
                        case 'd':
                        {
                            let commands = body.split(':');
                            let id = commands[0];
                            let bytes = commands[1];
                            if (getState().bearStory.downloadingStoryId != parseInt(id)) {
                                dispatch(uploadStoryToBear(id));
                            }
                            dispatch(downloaded(parseInt(bytes), id));
                            //console.log('downloaded: ' + body + ' bytes');
                        }
                            break;
                        case 'f':
                        {
                            dispatch(stopDowload());
                            dispatch(setError('Загрузка завешнена'));
                            dispatch(setBearStories());
                            //console.log('downloaded: ' + body + ' bytes');
                        }
                            break;
                        case 'w':
                        {
                            dispatch(toggleWiFiActive(true));
                            if (body != '1' || body != '2' || body != '3')
                            {
                                dispatch(setConnectedWiFiSSID(body));
                            }
                        }
                            break;
                        default:
                            dispatch(toggleWiFiActive(false));
                            break;
                    }
                }
                if (heartBeatID === undefined) {
                    heartBeatID = setTimeout(() => {
                        heartBeatID = undefined;
                        heartBeat()(dispatch, getState);
                    }, 2000);
                }
            },
            (error) => {
                console.log('heartBeat error:');
                console.log(error);
                if (error === 'not connected') {
                    heartBeatID = 0;
                }
                if (heartBeatID === undefined) {
                    heartBeatID = setTimeout(() => {
                        heartBeatID = undefined;
                        heartBeat()(dispatch, getState);
                    }, 2000);
                }
            }
        );

    }
}

export function syncTime() {
    // setTime
    let instance = Bluetooth.getInstance();
    return instance.setTime()
        .then(() => {})
        .catch((error) => { throw error; });
}
