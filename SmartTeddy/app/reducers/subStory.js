

const initialState = {
    subStoryId: []
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SEE_SUB_STORY':
            let array = state.subStoryId;
            let id = action.id;
            array[parseInt(id)] = id;
            return {
                ...state,
                subStoryId: array
            };
        default:
            return state
    }
}