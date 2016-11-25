import * as types from './actionTypes';

function requestStories():Action {
    return {
        type: types.REQUEST_USER_STORIES
    }
}
function receiveStories(json):Action {
    let arr = json.body.stories;
    let storiesArray=[];
    arr.forEach(function(item,i,arr){storiesArray[item.id] = item});
    return {
        type: types.RECEIVE_USER_STORIES,
        stories: storiesArray,
        receivedAt: Date.now()
    }
}
function requestStoriesFail():Action {
    return {
        type: types.REQUEST_USER_STORIES_FAIL
    }
}

export function fetchStories() {

    return function (dispatch,getState) {
        dispatch(requestStories());
        let url = 'https://hardteddy.ru/api/user/mystories';
        let state = getState();
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': state.user.token
            }
        }).then((response) => response.json())
            .then(json => dispatch(receiveStories(json))
        ).catch((error) => {
                dispatch(requestStoriesFail());
                console.log('fetch user stories error:');
                console.log(error)
            });
    }
}
