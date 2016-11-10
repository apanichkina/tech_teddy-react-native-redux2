import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import AppNavigator from '../containers/AppNavigator';
import { connect, Provider } from 'react-redux';
import * as reducers from '../reducers';
import { addStory, buyStory } from '../actions/store'
import { setBearStories } from '../actions/bear'
import { setStoriesResource } from '../actions/story'
import { fetchStories } from '../actions/storyFromServer'
import { fetchCategories } from '../actions/storyCategory'
import { receiveCategories } from '../actions/storyCategory'
import { receiveStories } from '../actions/storyFromServer'
import { setToken } from '../actions/user'
import { PossiblePurposes } from '../actions/actionTypes'
import { setAlarmTime, getAlarmTime } from '../actions/alarm'
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
// Выведем в консоль начальное состояние
//console.log(store.getState())

// Каждый раз при обновлении состояния - выводим его
// Отметим, что subscribe() возвращает функцию для отмены регистрации слушателя
//let unsubscribe = store.subscribe(() =>
//        console.log(store.getState())
//)

store.dispatch(setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImpvcGEiLCJ0eXBlIjoidXNlciJ9.2QyJX3PfqDFzv24Dt5jB-ZHO0dBWeuzayO0ezjmvYGA'));

store.dispatch(fetchCategories())

store.dispatch(fetchStories(PossiblePurposes.USER))
store.dispatch(fetchStories(PossiblePurposes.SHOP))
store.dispatch(setStoriesResource(PossiblePurposes.USER))
//store.dispatch(setAlarmTime(new Date()))

console.log(store.getState())
// Прекратим слушать обновление состояния
//unsubscribe()
export default class App extends React.Component  {

  render() {
    return (
        <Provider store={store}>
            <AppNavigator/>
        </Provider>
    );
  }
}


