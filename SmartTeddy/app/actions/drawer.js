import * as types from './actionTypes';

export function openDrawer():Action {
    return {
        type: types.OPEN_DRAWER
    };
}

export function closeDrawer():Action {
    return {
        type: types.CLOSE_DRAWER
    };
}
