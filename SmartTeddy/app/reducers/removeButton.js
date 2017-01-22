

const initialState = {
    isFetching: false,
    isWaiting: false,
    id: -1
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'PRESS_REMOVE_BUTTON':
            return Object.assign({}, state, {
                isWaiting: true,
                id: action.id
            });
        case 'START_REMOVE_ACTION':
            return Object.assign({}, state, {
                isWaiting: false,
                isFetching: true
            });
        case 'DONE_REMOVE_ACTION':
            return {
                ...state,
                isFetching: false,
                id: -1
            };
        default:
            return state
    }
}