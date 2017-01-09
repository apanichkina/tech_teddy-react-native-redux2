import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import AppNavigator from '../containers/AppNavigator';
import Root from './Root';
import { connect, Provider } from 'react-redux';
import * as reducers from '../reducers';
import { setBearStories } from '../actions/bear'
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
const subStoryTransform = createFilter(
    'subStory',
    ['subStoryId']
);
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer, undefined, autoRehydrate());
persistStore(store, {whitelist: ['user', 'userStories','storyCategory','subStory'],transforms: [userTransform, userStoriesTransform, storyCategoryTransform, subStoryTransform],storage: AsyncStorage}, () => {
    console.log('rehydration complete')});
//TODO disable landscape orientation http://stackoverflow.com/questions/32176548/how-to-disable-rotation-in-react-native


export default class App extends React.Component  {

  render() {
    return (
        <Provider store={store}>
            <Root/>
        </Provider>
    );
  }
}


