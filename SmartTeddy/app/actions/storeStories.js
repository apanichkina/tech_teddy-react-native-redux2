import * as types from './actionTypes';

function requestStories():Action {
    return {
        type: types.REQUEST_STORE_STORIES
    }
}
function receiveStories(json):Action {
    let arr = json.body.stories;
    let storiesArray=[];
    arr.forEach(function(item,i,arr){storiesArray[item.id] = item});
    return {
        type: types.RECEIVE_STORE_STORIES,
        stories: storiesArray,
        receivedAt: Date.now()
    }
}

export function fetchStories() {

    return function (dispatch) {
        dispatch(requestStories());
        url = 'https://hardteddy.ru/api/store/story';
        return fetch(url, {
            method: 'GET',
            headers: {}
        }).then(response => response.json())
            .then(json => dispatch(receiveStories(json))
        ).catch((error) => {
                console.log('fetch store stories error:');
                console.log(error)
            });
    }
}
