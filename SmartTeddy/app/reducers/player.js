

const initialState = {
    storyId: -1,
    isStoryPaused: true
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'PLAY_STORY':
            return {
                ...state,
                isStoryPaused: false,
                storyId: action.id
            };
        case 'PAUSE_STORY':
            let currentState = state.isStoryPaused;
            let newState = !currentState;
            console.log('current: '+ state.isStoryPaused);
            console.log('new: '+newState);
            return {
                ...state,
                isStoryPaused: newState
            };
        default:
            return state
    }
}