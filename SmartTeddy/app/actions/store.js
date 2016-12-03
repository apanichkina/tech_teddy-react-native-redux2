import * as types from './actionTypes';
import {fetchStories} from './userStories';

export function fetchBuyStory(id) {
    return function (dispatch,getState) {
        fetch('https://hardteddy.ru/api/store/buy', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getState().user.token
        },
        body: JSON.stringify({
            'storyID': id
        })
    }).then(response => response.json())
            .then(tempResponseJson =>  tempResponseJson)
        .then(responseJson => {
            if (responseJson.status == 0){
                dispatch(fetchStories())
            }
            else{
                console.log('buy failed')
            }
        }).catch((error) => {
                console.log('buy error:')
            console.log(error)
        });
    }
}
