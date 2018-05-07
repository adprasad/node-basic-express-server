export function SecureRoutes(parentRoute = '/') {
    let route = '';
    switch(parentRoute){
        case 'health':{
            route = '/' + parentRoute;
            break;
        }
        case 'auth':{
            route = '/auth';
            break;
        }
        case 'google':{
            route = '/auth/google';
            break;
        }
        default: {
            route = parentRoute;
        }
    }
    return route;
};