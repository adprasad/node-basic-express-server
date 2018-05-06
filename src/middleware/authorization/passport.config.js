import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import dotenv from 'dotenv';

const authCfg = dotenv.config({path: './src/middleware/authorization/.env'});
if (authCfg.error) {
    console.error("Unable to configure environment");
    throw authCfg.error;
} else {
    console.debug(authCfg);
}

const GOOGLE_OPTIONS = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    returnURL: '/auth/google/callback'
};

passport.use(new GoogleStrategy(GOOGLE_OPTIONS,
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

export default passport;