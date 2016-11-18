import * as types from './actionTypes';


export function buyStory(id:number):Action {
    return {
        type: types.BUY_STORY,
        id
    }
}
export function addStory(name:string, id:number, categoryId:number):Action {
    return {
        type: types.ADD_STORY,
        id,
        name,
        categoryId
    }
}
export function fetchBuyStory(id) {
    console.log('id:'+id);
    return function (dispatch,getState) {
        fetch('https://hardteddy.ru/api/store/buy', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getState().user.userToken
        },
        body: JSON.stringify({
            'storyID': id
        })
    }).then(response =>
        { console.log(response); return response.json() }
        )
            .then(tempResponseJson => {console.log(tempResponseJson); return tempResponseJson})
        .then(responseJson => {
            console.log(responseJson);
            if (responseJson.status == 0){
                console.log('buy success')
                console.log('id into buy'+id);
                dispatch(buyStory(id))
                return 0;
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
