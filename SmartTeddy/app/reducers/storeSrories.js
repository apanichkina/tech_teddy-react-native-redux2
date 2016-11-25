

const initialState = {
    isFetching: false,
    stories: []
};

export default function(state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_STORE_STORIES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_STORE_STORIES':
            return Object.assign({}, state, {
                isFetching: false,
                stories: action.stories,
                lastUpdated: action.receivedAt
            });
        case 'REQUEST_STORE_STORIES_FAIL':
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state
    }
}