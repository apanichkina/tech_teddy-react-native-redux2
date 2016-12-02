

const initialState = {
    isFetching: false,
    isWaiting: false,
    id: -0
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'PRESS_PLAY_BUTTON':
            return Object.assign({}, state, {
                isWaiting: true,
                id: action.id
            });
        case 'START_PLAY_ACTION':
            return Object.assign({}, state, {
                isWaiting: false,
                isFetching: true
            });
        case 'DONE_PLAY_ACTION':
            return {
                ...state,
                isFetching: false,
                id: -1
            };
        default:
            return state
    }
}