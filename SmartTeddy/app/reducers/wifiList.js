

const initialState = {
    wifiList: [],
    isFetching: false
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_WIFI_LIST':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_WIFI_LIST':
            return Object.assign({}, state, {
                isFetching: false,
                wifiList: action.list
            });
        case 'REQUEST_WIFI_LIST_FAIL':
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state
    }
}