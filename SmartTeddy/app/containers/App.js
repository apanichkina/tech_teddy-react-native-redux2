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

//TODO disable landscape orientation http://stackoverflow.com/questions/32176548/how-to-disable-rotation-in-react-native
//const Realm = require('realm');
//const realm = new Realm({
//    schema: [{
//        name: 'Token',
//        primaryKey: 'name',
//        properties: {
//            name: 'string',
//            token : 'string',
//            ownerName: 'string' //username or bearname
//        }
//    }]
//});
//
//const device = new Realm({
//    schema: [{
//        name: 'Device',
//        primaryKey: 'name',
//        properties: {
//            name: 'string',
//            id: 'string',
//            token : 'string'
//        }
//    }]
//});

store.dispatch(fetchCategories())

store.dispatch(fetchStories(PossiblePurposes.USER))
store.dispatch(fetchStories(PossiblePurposes.SHOP))
store.dispatch(setStoriesResource(PossiblePurposes.USER))
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


