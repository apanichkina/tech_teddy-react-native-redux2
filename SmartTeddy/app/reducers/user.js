const initialState = {
    userToken: ''
};


export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {
                userToken: action.token

            };
        default:
            return state
    }
}