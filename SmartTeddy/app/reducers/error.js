

const initialState = {
    isVisible: false,
    message: 'error msg'
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SET_ERROR_VISIBLE':
            return {
                ...state,
                isVisible: true
            };
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                message: action.message
            };
        case 'SET_ERROR_NOT_VISIBLE':
            return {
                ...state,
                isVisible: false
            };
        case 'SET_ERROR':
            return Object.assign({}, state, {
                message: action.message,
                isVisible: true
            });
        default:
            return state
    }
}