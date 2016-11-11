

const initialState = {
    bearStories: [],
    isFetching: false,
    connectedBearName: '',
    storyIsPlaying: false,
    storyIsPaused: false
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
        case 'SET_CONNECTED_BEAR_NAME':
            return {
                ...state,
                connectedBearName: action.name
            };
        case 'UPLOAD_STORY':
            return {
                ...state,
                bearStories: [...state.bearStories, action.id]
            };
        case 'DELETE_STORY':
            let bearStories = state.bearStories;
            let index = bearStories.indexOf(action.id);
            if (index >= 0) bearStories.splice(index,1);
            return {
                ...state,
                bearStories: bearStories
            };
        case 'PLAY_STORY':
            return {
                ...state,
                storyIsPlaying: true
            };
        case 'PAUSE_STORY':
            return {
                ...state,
                storyIsPaused: true
            };
        default:
            return state
    }
}