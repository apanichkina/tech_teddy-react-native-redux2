import * as types from './actionTypes';

export function requestStories(id):Action {
    console.log('Interactive: requestStories()')
    return {
        type: types.REQUEST_INTERACTIVE_STORIES,
        id
    }
}
export function receiveStories(id, json):Action {
    console.log('Interactive: resieveStories()')
    let arr = json.body.substories;
    let storiesArray=[];
    arr.forEach(function(item,i,arr){storiesArray[item.chapterID] = item});
    return {
        type: types.RECEIVE_INTERACTIVE_STORIES,
        id,
        stories: storiesArray,
        receivedAt: Date.now()
    }
}

export function fetchStories(id) {
    console.log('GO interactive fetch!!!!!!');
    return function (dispatch,getState) {
        dispatch(requestStories(id));
        let url = 'https://hardteddy.ru/api/store/story/substories/'+id;
                let state = getState();
                return fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': state.user.userToken
                    }
                }).then((response) => response.json())
                    .then(json =>
                        dispatch(receiveStories(id, json))
                ).catch((error) => {
                        console.log('fetch interactive stories error:');
                        console.log(error)
                    });

    }
}