

const initialState = {
    downloaded: 0,
    downloadingStoryId: -1,
    downloadingStorySize: 0
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'UPLOAD_STORY':
            return {
                ...state,
                downloadingStoryId: action.id,
                downloadingStorySize: action.size,
                downloaded: 0.01
            };
        case 'DOWNLOADED_STORY':
            let downloadedPath = 0;
            if (state.downloadingStorySize) downloadedPath = action.bytes / state.downloadingStorySize;
            return {
                ...state,
                downloaded: downloadedPath
            };
        case 'FINISH_PROGRESS':
            return {
                ...state,
                downloaded: 1
            };
        case 'STOP_DOWNLOAD':
            return Object.assign({}, state, {
                downloadingStoryId: -1,
                downloadingStorySize: 0,
                downloaded: 0
            });
        default:
            return state
    }
}