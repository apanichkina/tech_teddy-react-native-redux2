const initialState = {
    userToken: '',
    token: '',
    user: '',
    isFetching: false
};


export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {
                userToken: action.token

            };
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
        // discards the current token (logout)
        case 'AUTH_DISCARD_TOKEN':
            return {};
        // saves the current user
        case 'AUTH_SET_USER':
            return {
                ...state,
                user: action.user
            };
        default:
            return state
    }
}