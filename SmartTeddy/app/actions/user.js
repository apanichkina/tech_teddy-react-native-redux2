import * as types from './actionTypes';
import {popRoute, popNRoute} from './route'
import {fetchStories} from './userStories'
import {setError} from './error'
import timeout from '../FetchTimeout';
import {isConnectedInternet} from './internet'
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
export function authSignUpRequestFail(){
    return {
        type: types.AUTH_SIGN_UP_REQUEST_FAIL
    };
}

export function authSignInRequestFail(){
    return {
        type: types.AUTH_SIGN_IN_REQUEST_FAIL
    };
}

export function socialSignUp(success, usertoken, beartoken) {
    if(success){
        // Все хорошо
        dispatch(authSetToken(usertoken));
        dispatch(authSetUser(""));
        dispatch(fetchStories());
        dispatch(popNRoute(2));
    }
    else{
        dispatch(setError('Вход в социальную сеть завершился крахом'));
        dispatch(popNRoute(1));
    }
}

export function fetchSignIn(email, password) {

    return function (dispatch, getState) {
        let state = getState();
        if (!state.internet.isConnected) dispatch(setError('Нет интернета'));
        else {
        dispatch(requestSignIn());
        let url = 'https://magicbackpack.ru/api/user/login';
        return timeout(3000,fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })

        })).then(response => response.json())
            .then(responseJson => {
                if(responseJson.status == 0){
                    // Все хорошо
                    let userToken = responseJson.body.userToken;
                    dispatch(authSetToken(userToken));
                    dispatch(authSetUser(email));
                    dispatch(fetchStories());
                    dispatch(popRoute());
                }
                else{
                    dispatch(setError('Неверный адрес/пароль'));
                    dispatch(authSignInRequestFail())
                }
            }
        ).catch((error) => {
                console.log('sign in error:');
                console.log(error);
                if (error instanceof TypeError && (error.message == 'Network request failed' || error.message == 'timeout')){
                    console.log('Запрос закрашился');
                    dispatch(setError('Нет интернета'));
                }else {
                    dispatch(setError('Не удалось войти'));
                }
                dispatch(authSignInRequestFail());
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
        let url = 'https://magicbackpack.ru/api/user/signup';
        return timeout(5000,fetch(url, {
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
        })).then(response => response.json())
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
                    dispatch(setError('Ошибка регистрации'));
                    let body = responseJson.body;
                    console.log(body);
                    if(body.login) {
                        dispatch(setError('Эл. адрес уже зарегистрирован'));
                    }
                    ////////
                    dispatch(authSignUpRequestFail());
                }
            }
        ).catch((error) => {
                console.log('sign up error:');
                console.log(error)
                if (error instanceof TypeError && (error.message == 'Network request failed' || error.message == 'timeout')){
                    console.log('Запрос закрашился');
                    dispatch(setError('Нет интернета'));
                }else {
                    dispatch(setError('Не удалось зарегистрироваться'));
                }
                dispatch(authSignUpRequestFail());
            });
    }
    }

}