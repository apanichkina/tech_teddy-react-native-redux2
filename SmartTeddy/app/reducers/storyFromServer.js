

const initialState = {
    isFetching: false,
    didInvalidate: false,
    stories: []
};

function stories(state = initialState, action={}) {
    switch (action.type) {
        case 'INVALIDATE_PURPOSE':
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case 'REQUEST_STORIES':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_STORIES':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
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

function storiesByPurpose(state = {}, action={}) {
    switch (action.type) {
        case 'INVALIDATE_PURPOSE':
        case 'RECEIVE_STORIES':
        case 'REQUEST_STORIES':
            return Object.assign({}, state, {
                [action.purpose]: stories(state[action.purpose], action)
            });
        case 'BUY_STORY':
            let boughtStory= state.SHOP.stories[action.id];
            if (!boughtStory) break;
            return Object.assign({}, state, {
                ['USER']: addInnerState(state['USER'], action, boughtStory)
            });

        default:
            return state
    }
}



export default storiesByPurpose