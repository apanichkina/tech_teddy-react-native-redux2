import * as types from './actionTypes';
import {popRoute, popNRoute} from './route'
import {fetchStories} from './userStories'
import {setError} from './error'
export function authSetToken(token){
    return {
        type: types.AUTH_SET_TOKEN,
        token
    };
}

export function authDiscardToken(){
    return {
        type: types.AUTH_DISCARD_TOKEN
    };
}

export function authSetUser(user){
    return {
        type: types.AUTH_SET_USER,
        user
    };
}

export function requestSignIn():Action {
    return {
        type: types.REQUEST_SIGN_IN
    }
}
export function requestSignUp():Action {
    return {
        type: types.REQUEST_SIGN_UP
    }
}
export function authRequestFail(){
    return {
        type: types.AUTH_REQUEST_FAIL
    };
}

export function fetchSignIn(name, password) {

    return function (dispatch, getState) {
        let state = getState();
        if (!state.internet.isConnected) dispatch(setError('Нет интернета'));
        else {
        dispatch(requestSignIn());
        let url = 'https://hardteddy.ru/api/user/login';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'password': password
            }),
            timeout: 2000

        }).then(response => response.json())
            .then(responseJson => {
                if(responseJson.status == 0){
                    // Все хорошо
                    let userToken = responseJson.body.userToken;
                    dispatch(authSetToken(userToken));
                    dispatch(authSetUser(name));
                    dispatch(fetchStories());
                    dispatch(popRoute());
                }
                else{
                    dispatch(setError('Неверный логин/пароль'));
                    dispatch(authRequestFail())
                }
            }
        ).catch((error) => {
                dispatch(setError('Не удалось войти'));
                dispatch(authRequestFail());
                console.log('sign in error:');
                console.log(error)
            });
    }
    }

}
export function fetchSignUp(name, email, password1, password2) {

    return function (dispatch, getState) {
        let state = getState();
        if (!state.internet.isConnected) dispatch(setError('Нет интернета'));
        else {
        dispatch(requestSignUp());
        let url = 'https://hardteddy.ru/api/user/register';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password1: password1,
                password2: password2
            })
        }).then(response => response.json())
            .then(responseJson => {
                if(responseJson.status == 0){
                    // Все хорошо
                    let userToken = responseJson.body.userToken;
                    dispatch(authSetToken(userToken));
                    dispatch(authSetUser(email));
                    dispatch(fetchStories());
                    dispatch(popNRoute(2));
                } else {
                    //////////
                    let body = responseJson.body;
                    console.log(body);
                    if(body.login) {
                        dispatch(setError('Эл. адрес уже зарегистрирован'));
                    }
                    ////////
                    dispatch(authRequestFail());
                }
            }
        ).catch((error) => {
                dispatch(setError('Не удалось зарегистрироваться'));
                dispatch(authRequestFail());
                console.log('sign up error:');
                console.log(error)
            });
    }
    }

}