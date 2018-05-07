// Used to combine routes
import express from 'express';
//import session from 'express-session';
import health from './health';
import google from './google-auth';
//import auth from './auth';

export default (p) =>{
    let router = express();

    router.use('/', health() );
    router.use('/auth/google', google(p))
    
    return router;
};