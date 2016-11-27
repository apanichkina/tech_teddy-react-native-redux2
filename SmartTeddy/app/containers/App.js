import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import AppNavigator from '../containers/AppNavigator';
import Root from './Root';
import { connect, Provider } from 'react-redux';
import * as reducers from '../reducers';
import { addStory, buyStory } from '../actions/store'
import { setBearStories } from '../actions/bear'
import { setStoriesResource } from '../actions/story'
import { fetchStories } from '../actions/storeStories'
import { fetchCategories } from '../actions/storyCategory'
import { receiveCategories } from '../actions/storyCategory'
import { setToken } from '../actions/user'
import { PossiblePurposes } from '../actions/actionTypes'
import { setAlarmTime, getAlarmTime } from '../actions/alarm'
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native'
import createFilter from 'redux-persist-transform-filter';
import QueueTask from '../QueueTask';
import {addUserTask} from '../queue';
//
//addUserTask('task1', function () {
//        return new Promise((resolve, reject)=>{
//            setTimeout(function () {
//                console.log('Первая функция 1600');
//                resolve('Результат первой функции');
//            }, 2000)
//        });
//    },
//    function(){console.log('onStart')},
//    function(){console.log('I talk success 1')},
//    function(){console.log('I talk fail 1')}
//);
//let task1 = new QueueTask('task1',
//    function () {
//        return new Promise((resolve, reject)=>{
//            setTimeout(function () {
//                console.log('Первая функция 1500');
//                resolve('Результат первой функции');
//            }, 2000)
//        });
//    },
//    function(){console.log('onStart')},
//    function(){console.log('I talk success 1')},
//    function(){console.log('I talk fail 1')}
//);
//
//
//task1.then(function (result) {
//    console.log('Таск 1 выполненс с результатом:', result);
//});
//
//let task2 = new QueueTask('task2',
//    function (done, fail) {
//        setTimeout(function () {
//            console.log('Вторая функция 2500');
//            done('Результат второй функции');
//        }, 200)
//    },
//    function(){console.log('onStart 222')},
//    function(){console.log('I talk success 2')},
//    function(){console.log('I talk fail 2')}
//);
//
//
//task2.then(function (result) {
//    console.log('Таск 2 выполненс с результатом:', result);
//});
//queue.push(task1, 2, function(err){console.log('finished processing first');});

//queue.push(task2, 1, function(err){console.log('finished processing second');});


//////////////////
const userTransform = createFilter(
    'user',
    ['token','user']
);
const userStoriesTransform = createFilter(
    'userStories',
    ['stories']
);
const storyCategoryTransform = createFilter(
    'storyCategory',
    ['categories']
);
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
//const store = createStoreWithMiddleware(reducer);
//const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
const store = createStoreWithMiddleware(reducer, undefined, autoRehydrate());
persistStore(store, {whitelist: ['user', 'userStories','storyCategory'],transforms: [userTransform, userStoriesTransform, storyCategoryTransform],storage: AsyncStorage}, () => {
    console.log('rehydration complete')});
//TODO disable landscape orientation http://stackoverflow.com/questions/32176548/how-to-disable-rotation-in-react-native

store.dispatch(fetchCategories())

//store.dispatch(fetchStories(PossiblePurposes.USER))
//store.dispatch(fetchStories())

//store.dispatch(setAlarmTime(new Date()))

// Прекратим слушать обновление состояния
//unsubscribe()
export default class App extends React.Component  {

  render() {
    return (
        <Provider store={store}>
            <Root/>
        </Provider>
    );
  }
}


