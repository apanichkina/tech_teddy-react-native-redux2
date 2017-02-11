

const initialState = {
    alarmTime: new Date(),
    alarmDays: [false, false, false, false, false, false, false],
    isAlarmActive: false,
    isSoundActive: false,
    isVibroActive: false,
    isLightActive: false,
    isAlarmPlaying: false

};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SET_ALARM_TIME':
            return {
                ...state,
                alarmTime: action.time
            };
        case 'SET_ALARM_DAY':
            let days = state.alarmDays;
            let new_days = [];
            days.map((day,i) => new_days[i]=day);
            new_days[action.index] = !new_days[action.index];
            return {
                ...state,
                alarmDays: new_days
            };
        case 'SET_ALARM_DAYS':
            return {
                ...state,
                alarmDays: action.days
            };
        case 'TOGGLE_ALARM_ACTIVE':
            let currentActiveState = state.isAlarmActive;
            let newActiveState = !currentActiveState;
            return {
                ...state,
                isAlarmActive: newActiveState
            };
        case 'TOGGLE_ALARM_LIGHT':
            let currentLightState = state.isLightActive;
            let newLightState = !currentLightState;
            return {
                ...state,
                isLightActive: newLightState
            };
        case 'TOGGLE_ALARM_VIBRO':
            let currentVibroState = state.isVibroActive;
            let newVibroState = !currentVibroState;
            return {
                ...state,
                isVibroActive: newVibroState
            };
        case 'TOGGLE_ALARM_SOUND':
            let currentSoundState = state.isSoundActive;
            let newSoundState = !currentSoundState;
            return {
                ...state,
                isSoundActive: newSoundState
            };
        case 'ALARM_IS_PLAYING':
            return {
                ...state,
                isAlarmPlaying: true
            };
        case 'STOP_ALARM':
            return {
                ...state,
                isAlarmPlaying: false
            };
        default:
            return state
    }
}