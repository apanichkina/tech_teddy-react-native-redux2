

const initialState = {
    isConnected: false
};

export default function (state= initialState, action={}) {
    switch (action.type) {
        case "IS_CONNECTED_INTERNET":
            return {
                ...state,
                isConnected: action.state
            };
        default:
            return state;
    }
}