

const initialState = {
    subStoryId: ''
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SEE_SUB_STORY':
            return {
                ...state,
                subStoryId: action.id
            };
        default:
            return state
    }
}