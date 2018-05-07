import Router from 'express';
import jwt from 'jsonwebtoken';

let jwtCfg = require('dotenv').config({
    path: './src/middleware/authorization/.env'
});

if (jwtCfg.error) {
    console.error("Unable to configure environment");
    throw jwtCfg.error;
}

const USING_JWT = process.env.USE_JWTOKEN;
const JWT_SECRET = process.env.JWT_SECRET;


export default (passport) => {
    let api = Router({
        mergeParams: true
    });
    api.get('/',
        passport.authenticate('google', {
            session: false,
            scope: ['openid', 'email', 'profile']
        }),
        function (req, res) {
            console.info("According to documentations we should never get into this function.");
            res.json({
                google: true
            })
        });

    api.get('/callback',
        passport.authenticate(['google'], {
            session: false,
            failureRedirect: '/v1/health'
        }), function (req, res) {
            let user = req.user;
            if (USING_JWT === 'true' || USING_JWT == true) {
                const token = jwt.sign(user, JWT_SECRET);
                return res.json({
                    user,
                    token
                });
            }
            res.json(req.user);
        });
        return api;
    };