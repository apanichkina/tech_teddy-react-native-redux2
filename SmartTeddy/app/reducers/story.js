

const initialState = {
    storyId: 0
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SEE_STORY':
            return {
                ...state,
                storyId: action.id
                
            };
        default:
            return state
    }
}