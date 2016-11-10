import * as types from './actionTypes';
import Bluetooth from '../BluetoothLib'

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
    let d = res.charCodeAt(2);
    let time;
    time.setHours(res.charCodeAt(0), res.charCodeAt(1));

    let active = res.charCodeAt(3);
    let days = [];
    for (let i = 0; i < 7; ++i) {
        days[i] = (d >> i) & 0x01
    }

    let alarm_active = ((active >> 3) & 0x01);
    let alarm_lightActive = ((active >> 0) & 0x01);
    let alarm_vibroActive = ((active >> 1) & 0x01);
    let alarm_soundActive = ((active >> 2) & 0x01);
    let state = getState();
    if (state.alarm.isAlarmActive !== alarm_active) dispatch(toggleAlarmActive());
    if (state.alarm.isLightActive !== alarm_lightActive) dispatch(toggleAlarmLight());
    if (state.alarm.isVibroActive !== alarm_vibroActive) dispatch(toggleAlarmVibro());
    if (state.alarm.isSoundActive !== alarm_soundActive) dispatch(toggleAlarmSound());
    dispatch(setAlarmTime(time));
    //console.log('Reducer!!!!!!!');
    //console.log(days);
    dispatch(setAlarmDays(days));

}

export function getAlarmTime () {
    let instance = Bluetooth.getInstance();
    return function (dispatch, getState) {
        return instance.getAlarmTime()
            .then((res) => { this.parseTime(res,dispatch,getState ) })
            .catch((error) => {
                console.log('getAlarmTime error');
                console.log(error)
            });
    }
}
export function setAlarm () {
    let instance = Bluetooth.getInstance();
    return function (dispatch, getState) {
        let state = getState();
        var activate = {
            clock: state.alarm.isAlarmActive,
            lightActive: state.alarm.isLightActive,
            vibroActive: state.alarm.isVibroActive,
            soundActive: state.alarm.isSoundActive
        };
        return instance.setAlarm(state.alarm.alarmTime, state.alarm.alarmDays, activate)
            .then((res) => { this.parseTime(res,dispatch,getState ) })
            .catch((error) => {
                console.log('setAlarm error');
                console.log(error)
            });
    }

}


