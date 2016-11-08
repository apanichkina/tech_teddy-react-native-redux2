

const initialState = {
    storyId: 0,
    storiesResource: 'SHOP'
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SEE_STORY':
            return {
                storyId: action.id
                
            };
        case 'SET_STORIES_RESOURCE':
        return {
            ...state,
            storiesResource: action.storiesResource
        };
        default:
            return state
    }
}