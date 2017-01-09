

const initialState = {
    downloaded: 0,
    downloadingStoryId: -1,
    downloadingStorySize: 0,
    sizes: [],
    roled: false
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case 'UPLOAD_STORY':
            let roled = action.sizes.length > 1;
            return {
                ...state,
                downloadingStoryId: action.id,
                downloadingStorySize: action.size,
                sizes: action.sizes,
                roled: roled
            };
        case 'DOWNLOADED_STORY':
            let downloadedPath = 0;
            let bytes = action.bytes;
            if (state.downloadingStorySize) {
                if (state.roled){
                    let subId=action.id.split('_')[1];
                    bytes += state.sizes[subId-1];
                }
                downloadedPath = bytes / state.downloadingStorySize;
            }
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
                downloaded: 0,
                sizes: [],
                roled: false
            });

        default:
            return state
    }
}