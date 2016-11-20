const initialState = {
    token: null,
    user: null,
    isFetching: false
};


export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_SIGN_IN':
            return {
                ...state,
                isFetching: true
            };
        case 'AUTH_SET_TOKEN':
            return Object.assign({}, state, {
                isFetching: false,
                token: action.token
            });
        case 'AUTH_DISCARD_TOKEN':
            return Object.assign({}, state, {
                token: null,
                user: null
            });
        case 'AUTH_SET_USER':
            return {
                ...state,
                user: action.user
            };
        default:
            return state
    }
}