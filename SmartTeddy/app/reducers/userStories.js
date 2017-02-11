

const initialState = {
    isFetching: false,
    stories: [],
    isEmpty: false
};

export default function(state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_USER_STORIES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_USER_STORIES':
            let isEmptyValue = false;
            if (action.stories.length == 0) {
                isEmptyValue = true;
            }
            return Object.assign({}, state, {
                isFetching: false,
                stories: action.stories,
                isEmpty:isEmptyValue,
                lastUpdated: action.receivedAt
            });
        case 'REQUEST_USER_STORIES_FAIL':
            return Object.assign({}, state, {
                isFetching: false
            });
        case 'DISCARD_USER_STORIES':
            return Object.assign({}, state, {
                stories: []
            });
        default:
            return state
    }
}