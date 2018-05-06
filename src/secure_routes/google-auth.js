import {Router} from 'express';
import passport from '../middleware/authorization/passport.config';

export default () => {
    let api = Router();
    api.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        }));
    api.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function (req, res) {

        });
    return api;
};