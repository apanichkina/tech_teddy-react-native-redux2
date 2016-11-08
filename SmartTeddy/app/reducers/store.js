

const initialState = {
    stories: []
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'ADD_STORY':
            return {
                stories: [
                    ...state.stories,
                    {
                        name: action.name,
                        categoryId: action.categoryId,
                        id: action.id,
                        bought: false
                    }
                ]
            };
        default:
            return state
    }
}