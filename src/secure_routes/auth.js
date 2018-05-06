import {
    Router
} from 'express';

export default () => {
    let api = Router();
    api.get('/login', function () {
        console.info("Go to Login Page");
    });
    api.get('/logout', function () {
        console.info("Go to Logout Page");
    });
    return api;
};

export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(null);
    }
    res.redirect('/login')
}