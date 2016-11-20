

import { globalNav } from '../containers/AppNavigator';


const initialState = {
    routes: ['home']
};

export default function (state = initialState, action={}) {
    switch (action.type) {
        case "PUSH_NEW_ROUTE":
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
        case "POP_N_ROUTE":
        {
            globalNav.navigator.popN(action.count);
            const routes = state.routes;
            const count = action.count;
            for (let i = 0; i < count; ++i) {
                routes.pop();
            }
            return {
                routes
            };
        }
        case "POP_TO_TOP":
        {
            globalNav.navigator.popToTop();
            const routes = state.routes;
            let new_routes = routes.slice(0,1);
            return {
                routes: new_routes
            };
        }
        default:
            return state;
    }
}