const initialState = {
    token: null,
    user: null,
    isSignInFetching: false,
    isSignUpFetching: false
};


export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_SIGN_IN':
            return {
                ...state,
                isSignInFetching: true
            };
        case 'REQUEST_SIGN_UP':
            return {
                ...state,
                isSignUpFetching: true
            };
        case 'AUTH_SET_TOKEN':
            return Object.assign({}, state, {
                isSignInFetching: false,
                isSignUpFetching: false,
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