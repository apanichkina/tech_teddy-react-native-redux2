const initialState = {
    isFetching: false,
    stories: []
};

function stories(state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_INTERACTIVE_STORIES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_INTERACTIVE_STORIES':
            return Object.assign({}, state, {
                isFetching: false,
                stories: action.stories,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function addInnerState(state = initialState, action={}, newStory={}) {
    switch (action.type) {
        case 'BUY_STORY':
            let storiesArray = state.stories;
            storiesArray[action.id] = newStory;
            return Object.assign({}, state, {
                stories: storiesArray
            });
        default:
            return state
    }
}

function storiesById(state = {}, action={}) {
    switch (action.type) {
        case 'RECEIVE_INTERACTIVE_STORIES':
        case 'REQUEST_INTERACTIVE_STORIES':
            return Object.assign({}, state, {
                [action.id]: stories(state[action.id], action)
            });
        default:
            return state
    }
}



export default storiesById