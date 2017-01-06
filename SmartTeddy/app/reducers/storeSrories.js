

const initialState = {
    isFetching: false,
    stories: [],
    isEmpty: false
};

export default function(state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_STORE_STORIES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_STORE_STORIES':
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


        case 'REQUEST_STORE_STORIES_FAIL':
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state
    }
}