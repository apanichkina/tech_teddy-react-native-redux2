import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'
import {addUserTask,addSystemTask } from '../queue';

export function setAlarmTime(time:Date):Action {
    return {
        type: types.SET_ALARM_TIME,
        time
    }
}

export function setAlarmDay(index):Action {
    return {
        type: types.SET_ALARM_DAY,
        index
    }
}

export function setAlarmDays(days):Action {
    return {
        type: types.SET_ALARM_DAYS,
        days
    }
}

export function toggleAlarmActive():Action {
    return {
        type: types.TOGGLE_ALARM_ACTIVE
    }
}

export function toggleAlarmLight():Action {
    return {
        type: types.TOGGLE_ALARM_LIGHT
    }
}

export function toggleAlarmVibro():Action {
    return {
        type: types.TOGGLE_ALARM_VIBRO
    }
}

export function toggleAlarmSound():Action {
    return {
        type: types.TOGGLE_ALARM_SOUND
    }
}



function parseTime (res, dispatch, getState) {
    let d = res.charCodeAt(4);
    let time = new Date();
    time.setHours(res.charCodeAt(0), res.charCodeAt(2));

    let active = res.charCodeAt(6);
    let days = [];
    for (let i = 0; i < 7; ++i) {
        days[i] = ((d >> i) & 0x01) ? true : false;
    }

    let alarm_active = ((active >> 3) & 0x01) ? true : false;
    let alarm_lightActive = ((active >> 0) & 0x01) ? true : false;
    let alarm_vibroActive = ((active >> 1) & 0x01) ? true : false;
    let alarm_soundActive = ((active >> 2) & 0x01) ? true : false;
    let state = getState();
    if (state.alarm.isAlarmActive !== alarm_active) dispatch(toggleAlarmActive());
    if (state.alarm.isLightActive !== alarm_lightActive) dispatch(toggleAlarmLight());
    if (state.alarm.isVibroActive !== alarm_vibroActive) dispatch(toggleAlarmVibro());
    if (state.alarm.isSoundActive !== alarm_soundActive) dispatch(toggleAlarmSound());
    dispatch(setAlarmTime(time));
    dispatch(setAlarmDays(days));
    

    /*var hm = res[0].split(':');
    let time = new Date();
    time.setHours(hm[0], hm[1]);

    let days = [];
    for (let i = 0; i < 7; ++i) {
        days[i] = (res[1][i] === '1') ? true : false;
    }

    let alarm_lightActive = (res[1][0] === '1') ? true : false;
    let alarm_vibroActive = (res[1][1] === '1') ? true : false;
    let alarm_soundActive = (res[1][2] === '1') ? true : false;
    let alarm_active = (res[1][3] === '1') ? true : false;
    let state = getState();
    if (state.alarm.isAlarmActive !== alarm_active) dispatch(toggleAlarmActive());
    if (state.alarm.isLightActive !== alarm_lightActive) dispatch(toggleAlarmLight());
    if (state.alarm.isVibroActive !== alarm_vibroActive) dispatch(toggleAlarmVibro());
    if (state.alarm.isSoundActive !== alarm_soundActive) dispatch(toggleAlarmSound());
    dispatch(setAlarmTime(time));
    dispatch(setAlarmDays(days));*/

}

export function getAlarmTime () {
    return function (dispatch, getState) {
        addUserTask('getAlarmTime',()=>{ let instance = Bluetooth.getInstance(); return instance.getAlarmTime(); },
            function(){},
            (res) => {
                parseTime(res,dispatch,getState )
            },
            (error) => {
                console.log('getAlarmTime error');
                console.log(error)
            }
        );

    }
}
export function setAlarm () {

    return function (dispatch, getState) {
        let state = getState();
        var activate = {
            clock: state.alarm.isAlarmActive,
            lightActive: state.alarm.isLightActive,
            vibroActive: state.alarm.isVibroActive,
            soundActive: state.alarm.isSoundActive
        };

        addUserTask('setAlarm',()=>{ let instance = Bluetooth.getInstance(); return instance.setAlarm(state.alarm.alarmTime, state.alarm.alarmDays, activate); },
            function(){},
            (res) => {
                parseTime(res,dispatch,getState )
            },
            (error) => {
                console.log('setAlarm error');
                console.log(error)
            }
        );

    }

}

export function alarmIsPlaying():Action {
    return {
        type: types.ALARM_IS_PLAYING
    }
}
