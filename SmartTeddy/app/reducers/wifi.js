

const initialState = {
    wifiPassword: '',
    wifiSSID: '',
    isWiFiActive: false
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SET_WIFI_PASSWORD':
            return {
                ...state,
                wifiPassword: action.password
            };
        case 'SET_WIFI_SSID':
            return {
                ...state,
                wifiSSID: action.ssid
            };
        case 'TOGGLE_WIFI_ACTIVE':
            return {
                ...state,
                isWiFiActive: action.value
            };
        default:
            return state
    }
}