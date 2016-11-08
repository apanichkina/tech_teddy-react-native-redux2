

import { globalNav } from '../containers/AppNavigator';


const initialState = {
    routes: ['home']
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case "PUSH_NEW_ROUTE":
            console.log('push'+action.route)
            globalNav.navigator.push({id: action.route});
            return {
                routes: [...state.routes, action.route]
            };
        case "REPLACE_ROUTE":
            globalNav.navigator.replaceWithAnimation({id: action.route});
            const routes = state.routes;
            routes.pop();
            return {
                routes: [...routes, action.route]
            };
        // For sidebar navigation
        case "REPLACE_OR_PUSH_ROUTE":
        {
            let routes = state.routes;
            if (routes[routes.length - 1] == action.route) {
                routes = [];
            }else {
                if (routes[routes.length - 1] === 'home') {
                    if (action.route !== 'home') {
                        globalNav.navigator.push({id: action.route});
                    } else { // If top route is home and user navigates to home, do nothing
                        routes = [];
                    }
                } else if (action.route === 'home') {
                    globalNav.navigator.resetTo({id: 'home'});
                    routes = [];
                } else {
                    globalNav.navigator.replaceWithAnimation({id: action.route});
                    routes.pop();
                }
            }

            return {
                routes: [...routes, action.route]
            };}
        case "POP_ROUTE":
        {
            globalNav.navigator.pop();
            const routes = state.routes;
            routes.pop();
            return {
                routes
            };}
        case "POP_TO_ROUTE":
        {
            globalNav.navigator.popToRoute({id: action.route});
            const routes = state.routes;
            while (routes.pop() !== action.route) {
                // keep popping till you get to the route
            }
            return {
                routes: [...routes, action.route]
            };}
        default:
            return state;
    }
}