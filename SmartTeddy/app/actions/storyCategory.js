import * as types from './actionTypes';
import timeout from '../FetchTimeout';

export function setCategoryFilter(category:string):Action {
    return {
        type: types.SET_CATEGORY_FILTER,
        category
    }
}

export function addCategory(name:string, id:number):Action {
    return {
        type: types.ADD_CATEGORY,
        id,
        name
    }
}
export function receiveCategories(json):Action {
    return {
        type: types.RECEIVE_CATEGORIES,
        posts: json.body.categories.map(child => child),
        receivedAt: Date.now()
    }
}

export function fetchCategories() {

    return function (dispatch) {
        let url = 'https://magicbackpack.ru/api/store/categories';
                return timeout(3000,fetch(url, {
                    method: 'GET',
                    headers: {}
                })).then(response => response.json())
                    .then(json => dispatch(receiveCategories(json))
                ).catch((error) => {
                        console.log('category error:');
                        console.log(error);
                        let hardCategories = {
                            "body": {
                                "categories": [
                                    {
                                        "id": 1,
                                        "name": "сказки"
                                    },
                                    {
                                        "id": 2,
                                        "name": "на ночь"
                                    },
                                    {
                                        "id": 3,
                                        "name": "помощь"
                                    },
                                    {
                                        "id": 4,
                                        "name": "ролевые"
                                    }
                                ]
                            },
                            "status": 0
                        };
                        dispatch(receiveCategories(hardCategories));
                    });
    }
}