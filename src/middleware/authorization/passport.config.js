import passport from 'passport';
import GOOGLE_STRATEGY from './google-passport.config';
import JWT_STRATEGY from './jwt-passport.config';

let authCfg = require('dotenv').config({
    path: './src/middleware/authorization/.env'
});

if (authCfg.error) {
    console.error("Unable to configure environment");
    throw authCfg.error;
}

if (process.env.USE_GOOGLE === true || process.env.USE_GOOGLE === 'true') {
    passport.use(GOOGLE_STRATEGY);
}
if (process.env.USE_LINKEDIN === true  || process.env.USE_LINKEDIN === 'true') {
    passport.use(LINKEDIN_STRATEGY);
}
if (process.env.USE_FACEBOOK === true || process.env.USE_FACEBOOK === 'true' ) {
    passport.use(FACEBOOK_STRATEGY);
}
if (process.env.USE_LOCAL === true || process.env.USE_LOCAL === 'true') {
    passport.use(LOCAL_STRATEGY);
}
if (process.env.USE_JWTOKEN === true || process.env.USE_JWTOKEN === 'true') {
    passport.use(JWT_STRATEGY);
}

passport.serializeUser(function (user, done) {
    console.log("serializeUser");
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log("deserializeUser");
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
///export default passport;
module.exports = passport;