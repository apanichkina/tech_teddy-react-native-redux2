

const initialState = {
    categoryFilter: 0,
    categories: []
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SET_CATEGORY_FILTER':
            return {
                ...state,
                categoryFilter: action.category
            };
        case 'ADD_CATEGORY':
            return {
                categories: [
                    ...state.categories,
                    {
                        name: action.name,
                        id: action.id
                    }
                ]
            };
        case 'RECEIVE_CATEGORIES':
            return Object.assign({}, state, {
                categories: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}
