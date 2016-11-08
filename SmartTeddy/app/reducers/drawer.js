

const initialState = {
    drawerState: 'closed'
};

export default function (state= initialState, action={}) {
    switch (action.type) {
        case "OPEN_DRAWER":
            return {
                ...state,
                drawerState: 'opened'
            };

        case "CLOSE_DRAWER":
            return {
                ...state,
                drawerState: 'closed'
            };
        default:
            return state;
    }
}