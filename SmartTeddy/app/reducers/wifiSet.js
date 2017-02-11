

const initialState = {
    isFetching: false,
    isWiFiActive: false,
    wifiPassword: '',
    wifiSSID: '',
    isModalVisible: false,
    connectedWiFiSSID: '',
    status: 0
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
        case 'SET_MODAL_VISIBILITY':
            return Object.assign({}, state, {
                isModalVisible: action.state
            });
        case 'DISCARD_WIFI':
            return Object.assign({}, state, {
                wifiPassword: '',
                wifiSSID: '',
                connectedWiFiSSID: '',
                status: 0
            });
        case 'SET_CONNECTED_WIFI_SSID':
            return Object.assign({}, state, {
                connectedWiFiSSID: action.ssid
            });
        case 'SET_WIFI_STATUS':
            return Object.assign({}, state, {
                connectedWiFiSSID: action.ssid,
                status: action.status
            });
        case 'TOGGLE_WIFI_ACTIVE':
            if (action.value) {
                return {
                    ...state,
                    isWiFiActive: action.value
                };
            } else {
                return {
                    ...state,
                    isWiFiActive: action.value,
                    connectedWiFiSSID: ''
                };
            }
        case 'TOGGLE_WIFI_ACTIVE_UNKNOWN':
            let oldVal =  state.isWiFiActive;
                return {
                    ...state,
                    isWiFiActive: !oldVal
                };
        case 'SET_WIFI_FETCHING':
            return {
                ...state,
                isFetching: action.value
            };
        default:
            return state
    }
}