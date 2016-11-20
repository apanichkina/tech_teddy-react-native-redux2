import * as types from './actionTypes';

export function requestStories(purpose:string):Action {
    return {
        type: types.REQUEST_STORIES,
        purpose
    }
}
export function receiveStories(purpose, json):Action {
    let arr = json.body.stories;
    let storiesArray=[];
    arr.forEach(function(item,i,arr){storiesArray[item.id] = item});
    return {
        type: types.RECEIVE_STORIES,
        purpose,
        stories: storiesArray,
        receivedAt: Date.now()
    }
}

//invalidatePurporse('store') - обровить содержимое магазина
//invalidatePurporse('user') - обровить содержимое "мои сказки"
export function invalidatePurporse(purpose:string):Action {
    return {
        type: types.INVALIDATE_PURPOSE,
        purpose
    }
}

// Тут мы встречаемся с нашим первым thunk-генератором действий!
// Хотя его содержимое отличается, вы должны использовать его, как и любой другой генератор действий:
// store.dispatch(fetchPosts('reactjs'))

export function fetchStories(purpose) {

    // Thunk middleware знает, как обращаться с функциями.
    // Он передает метод действия в качестве аргумента функции,
    // т.к. это позволяет отправить действие самостоятельно.

    return function (dispatch,getState) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestStories(purpose));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        let url = '';
        switch (purpose) {
            case types.PossiblePurposes.SHOP:
                url = 'https://hardteddy.ru/api/store/story';
                return fetch(url, {
                    method: 'GET',
                    headers: {}
                }).then(response => response.json())
                    .then(json =>

                        // We can dispatch many times!
                        // Here, we update the app state with the results of the API call.

                        dispatch(receiveStories(purpose, json))
                ).catch((error) => {
                        console.log('fetch store error:');
                        console.log(error)
                    });
            case types.PossiblePurposes.USER:
                url = 'https://hardteddy.ru/api/user/mystories';
                let state = getState();
                return fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': state.user.token
                    }
                }).then((response) => response.json())
                    .then(json =>

                        // We can dispatch many times!
                        // Here, we update the app state with the results of the API call.

                        dispatch(receiveStories(purpose, json))
                ).catch((error) => {
                        console.log('fetch user error:');
                        console.log(error)
                    });


            default:
                return console.log('нет такого purpose')
        }



        // In a real world app, you also want to
        // catch any error in the network call.
    }
}