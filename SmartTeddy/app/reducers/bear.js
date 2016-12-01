

const initialState = {
    bearStories: [],
    isFetching: false,
    connectedBearName: '',
    downloaded: 0
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'REQUEST_BEAR_STORIES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'SET_BEAR_STORIES':
            return {
                ...state,
                bearStories: action.stories,
                isFetching: false
            };
        case 'SET_BEAR_STORIES_FAILED':
            return {
                ...state,
                isFetching: false
            };
        case 'SET_CONNECTED_BEAR_NAME':
            return {
                ...state,
                connectedBearName: action.name
            };
        case 'DOWNLOADED_STORY':
            return {
                ...state,
                downloaded: action.bytes
            };
        case 'DELETE_STORY':
            let bearStories = state.bearStories;
            let index = bearStories.indexOf(action.id);
            if (index >= 0) bearStories.splice(index,1);
            return {
                ...state,
                bearStories: bearStories
            };
        default:
            return state
    }
}