import {
    Router
} from 'express';
import passport from '../middleware/authorization/passport.config';
import ensureAuthenticated from './auth';

export default () => {
    let api = Router();
    api.get('/auth/google',
        ensureAuthenticated(),
        passport.authenticate('google', {
            scope: ['profile']
        }));
    api.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            console.log(req);
            res.redirect('/');
        });
    return api;
};