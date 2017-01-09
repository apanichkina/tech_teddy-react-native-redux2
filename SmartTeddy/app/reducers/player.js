

const initialState = {
    storyId: -1,
    isStoryPaused: true
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'BEAR_PLAYER_PAUSED':
                return {
            ...state,
            isStoryPaused: true,
            storyId: action.id
        };
        case 'PLAY_STORY':
            return {
                ...state,
                isStoryPaused: false,
                storyId: action.id
            };
        case 'PAUSE_STORY':
            let currentState = state.isStoryPaused;
            let newState = !currentState;
            return {
                ...state,
                isStoryPaused: newState
            };
        case 'STOP_STORY':
            return {
                ...state,
                storyId: -1,
                isStoryPaused: true
            };
        default:
            return state
    }
}