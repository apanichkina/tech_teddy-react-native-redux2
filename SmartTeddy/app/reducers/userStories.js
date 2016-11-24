

const initialState = {
    isFetching: false,
    stories: []
};

export default function(state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_USER_STORIES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_USER_STORIES':
            return Object.assign({}, state, {
                isFetching: false,
                stories: action.stories,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}