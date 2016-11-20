import * as types from './actionTypes';



export function replaceRoute(route:string):Action {
    return {
        type: types.REPLACE_ROUTE,
        route
    };
}

export function pushNewRoute(route:string):Action {
    return {
        type: types.PUSH_NEW_ROUTE,
        route
    };
}

export function replaceOrPushRoute(route:string):Action {
    return {
        type: types.REPLACE_OR_PUSH_ROUTE,
        route
    };
}

export function popRoute():Action {
    return {
        type: types.POP_ROUTE
    };
}

export function popNRoute(count:number):Action {
    return {
        type: types.POP_N_ROUTE,
        count
    };
}

export function popToTop():Action {
    return {
        type: types.POP_TO_TOP
    };
}


