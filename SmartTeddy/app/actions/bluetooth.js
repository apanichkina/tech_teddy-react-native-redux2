import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {alarmIsPlaying} from './alarm'
import {setError} from './error'
import {downloaded} from './bearStory'
import { setBearStories, setConnectedBearName } from './bear'
import {playStory,pauseStory, stopStory}from './player'
import { pushNewRoute} from './route'
import {addUserTask, addSystemTask} from '../queue';
import {stopDowload} from './bearStory'
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
        return instance.list().then(array => {dispatch(receiveBears(array))}
        ).catch((error) => {
                console.log('bear search error:');
                console.log(error)
            });
    }
}

export function connectToDevice(id, name) {

    return function (dispatch, getState) {
        return new Promise((resolve, reject)=>{
            addUserTask('connect', ()=>{
                    let instance = Bluetooth.getInstance();
                    return instance.connect(id);
                },
                function () {
                    console.log('onStart setBearStories')
                },
                function (result) {
                    resolve(result);
                    dispatch(connectBluetooth());
                    dispatch(setConnectedBearName(name));
                    heartBeatID = setTimeout(() => {
                        //heartBeatID = undefined;
                        //heartBeat()(dispatch);

                        //СИНХРОНИЗАЦИЯ ВРЕМЕНИ -------- ЖЕСТЬ КАК ДОЛГО
                        syncTime()
                            .then(()=>{
                                heartBeatID = undefined;
                                heartBeat()(dispatch, getState)
                            })
                            .catch((err)=>{ console.log('syncTime failed', err);})

                    }, 2000);
                },
                (error) => {
                    reject(error);
                    dispatch(setError('connect to device fail')); //<-------пример, как кидать пользователю ошибки в Toast
                    console.log('connect ti device error:');
                    console.log(error);
                    throw error;
                }
            );
        });
        //  instance.connect(id).then(() => {
        //         // disconnectFromDevice();
        //         dispatch(connectBluetooth());
        //         dispatch(setConnectedBearName(name));
        //         heartBeatID = setTimeout(() => {
        //             //heartBeatID = undefined;
        //             //heartBeat()(dispatch);
        //
        //             //СИНХРОНИЗАЦИЯ ВРЕМЕНИ -------- ЖЕСТЬ КАК ДОЛГО
        //             syncTime()
        //                 .then(()=>{
        //                     heartBeatID = undefined;
        //                     heartBeat()(dispatch)
        //                 })
        //                 .catch((err)=>{ console.log('syncTime failed', err);})
        //
        //         }, 2000);
        //         // dispatch(setBearStories());
        //     }
        // ).catch((error) => {
        //         dispatch(setError('connect to device fail')); //<-------пример, как кидать пользователю ошибки в Toast
        //         console.log('connect ti device error:');
        //         console.log(error);
        //         throw error;
        //     });
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
                console.log('disconnectFromDevice');
                dispatch(setConnectedBearName(''));
            }
        ).catch((error) => {
                console.log('disconnect from device error:');
                console.log(error)
            });
    }
}

export function heartBeat() {
    return function (dispatch, getState) {

        // console.log('heartBeat me please');
        addSystemTask('heartBeat', ()=> {
                let instance = Bluetooth.getInstance();
                return instance.shortPolling();
            },
            function () {
                console.log('onStart heartBeat')
            },
            (array) => {
                let isDownloading = getState().bearStory.downloaded;
                console.log("HEARTBEAT ANSWER HERE:");
                console.log(array);
                if (!array.length && isDownloading) {
                    dispatch(setError('Загрузка завешнена'));
                    dispatch(stopDowload());
                    dispatch(setBearStories());
                }
                for (var i = 0; i < array.length; ++i) {
                    var code = array[i][0];
                    var body = array[i].substring(1);
                    switch (code) {
                        case 'a':
                        {
                            dispatch(alarmIsPlaying());
                            console.log('alarm: ', body);
                        }
                            break;
                        case 's':
                        {
                            //dispatch(playStory(body));
                            if (body == 'top') dispatch(stopStory());
                            console.log('story: ' + body +' is playing');
                        }
                            break;
                        case 'p':
                        {
                            //dispatch(pauseStory(body));
                            console.log('story: ' + body + ' is paused');
                        }
                            break;
                        case 'r':
                        {
                            // dispatch(speakRole(body));
                            console.log('hero: ' + body + ' is speaking');
                        }
                            break;
                        case 'd':
                        {
                            dispatch(downloaded(body));
                            console.log('downloaded: ' + body + ' bytes');
                        }
                            break;
                        default:
                            break;
                    }
                }
                if (heartBeatID === undefined) {
                    heartBeatID = setTimeout(() => {
                        heartBeatID = undefined;
                        heartBeat()(dispatch, getState);
                    }, 7000);
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
                    }, 7000);
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
