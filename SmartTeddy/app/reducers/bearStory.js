

const initialState = {
    downloaded: 0,
    downloadingStoryId: -1
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'UPLOAD_STORY':
            return {
                ...state,
                downloadingStoryId: action.id
            };
        case 'DOWNLOADED_STORY':
            return {
                ...state,
                downloaded: action.bytes
            };
        case 'STOP_DOWNLOAD':
            return Object.assign({}, state, {
                downloadingStoryId: -1,
                downloaded: 0
            });
        case 'DELETE_STORY':
            let bearStories = state.bearStories;
            let index = bearStories.indexOf(action.id);
            if (index >= 0) bearStories.splice(index,1);
            return {
                ...state,
                bearStories: bearStories
            };
        default:
            return state
    }
}