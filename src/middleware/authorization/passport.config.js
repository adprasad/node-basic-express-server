import passport from 'passport';
import GOOGLE_STRATEGY from './google-passport.config';

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
if (process.env.USE_LINKEDIN === true) {
    passport.use(LINKEDIN_STRATEGY);
}
if (process.env.USE_FACEBOOK === true) {
    passport.use(FACEBOOK_STRATEGY);
}
if (process.env.USE_LOCAL === true) {
    passport.use(LOCAL_STRATEGY);
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
///export default passport;
module.exports = passport;