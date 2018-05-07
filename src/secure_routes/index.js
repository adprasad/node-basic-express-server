// Used to combine routes
import express from 'express';
//import session from 'express-session';
import health from './health';
import google from './google-auth';
import user from './user';

export default (p) => {
    let router = express();

    router.use('/user',
        p.authenticate('jwt', {
            session: false
        }), user());
    router.use('/health', health());
    router.use('/auth/google', google(p))

    return router;
};