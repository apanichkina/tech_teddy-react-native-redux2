
//drawer
export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
//route
export const PUSH_NEW_ROUTE = 'PUSH_NEW_ROUTE';
export const REPLACE_ROUTE = 'REPLACE_ROUTE';
export const REPLACE_OR_PUSH_ROUTE = 'REPLACE_OR_PUSH_ROUTE';
export const POP_ROUTE = 'POP_ROUTE';
export const POP_N_ROUTE = 'POP_N_ROUTE';
export const POP_TO_TOP = 'POP_TO_TOP';

//category
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

//story
export const ADD_STORY = 'ADD_STORY';
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const RECEIVE_STORIES = 'RECEIVE_STORIES';
export const BUY_STORY = 'BUY_STORY';

//User stories
export const REQUEST_USER_STORIES = 'REQUEST_USER_STORIES';
export const RECEIVE_USER_STORIES = 'RECEIVE_USER_STORIES';

//Store stories
export const REQUEST_STORE_STORIES = 'REQUEST_STORE_STORIES';
export const RECEIVE_STORE_STORIES = 'RECEIVE_STORE_STORIES';


export const INVALIDATE_PURPOSE = 'INVALIDATE_PURPOSE';
export const SEE_STORY = 'SEE_STORY';
export const SET_STORIES_RESOURCE = 'SET_STORIES_RESOURCE';

//User
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_DISCARD_TOKEN = 'AUTH_DISCARD_TOKEN';
export const AUTH_SET_USER = 'AUTH_SET_USER';
export const AUTH_REQUEST_FAIL = 'AUTH_REQUEST_FAIL';
export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const REQUEST_SIGN_UP = 'REQUEST_SIGN_UP';

/*
 * другие константы
 */
export const PossiblePurposes = {
    SHOP: 'SHOP',
    USER: 'USER'
};

//Bluetooth

export const ENABLE_BLUETOOTH = 'ENABLE_BLUETOOTH';
export const DISABLE_BLUETOOTH = 'DISABLE_BLUETOOTH';

export const CONNECT_BLUETOOTH = 'CONNECT_BLUETOOTH';
export const UNCONNECT_BLUETOOTH = 'UNCONNECT_BLUETOOTH';
export const ISCONNECTED_BLUETOOTH = 'ISCONNECTED_BLUETOOTH';

export const SEARCH_BEARS = 'SEARCH_BEARS';

//Bear
export const REQUEST_BEAR_STORIES = 'REQUEST_BEAR_STORIES';
export const SET_BEAR_STORIES = 'SET_BEAR_STORIES';
export const SET_CONNECTED_BEAR_NAME = 'SET_CONNECTED_BEAR_NAME';

//Sory
export const UPLOAD_STORY = 'UPLOAD_STORY';
export const DOWNLOADED_STORY = 'DOWNLOADED_STORY';
export const DELETE_STORY = 'DELETE_STORY';

//Player
export const PLAY_STORY = 'PLAY_STORY';
export const PAUSE_STORY = 'PAUSE_STORY';

//Alarm
export const SET_ALARM_TIME = 'SET_ALARM_TIME';
export const SET_ALARM_DAY = 'SET_ALARM_DAY';
export const SET_ALARM_DAYS = 'SET_ALARM_DAYS';
export const ALARM_IS_PLAYING = 'ALARM_IS_PLAYING';
export const TOGGLE_ALARM_ACTIVE = 'TOGGLE_ALARM_ACTIVE';
export const TOGGLE_ALARM_LIGHT = 'TOGGLE_ALARM_LIGHT';
export const TOGGLE_ALARM_VIBRO = 'TOGGLE_ALARM_VIBRO';
export const TOGGLE_ALARM_SOUND = 'TOGGLE_ALARM_SOUND';

//WiFi
export const SET_WIFI_PASSWORD = 'SET_WIFI_PASSWORD';
export const SET_WIFI_SSID = 'SET_WIFI_SSID';
export const TOGGLE_WIFI_ACTIVE = 'TOGGLE_WIFI_ACTIVE';
