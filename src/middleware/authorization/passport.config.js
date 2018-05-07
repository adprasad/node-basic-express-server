import passport from 'passport';
import GOOGLE_STRATEGY from './google-passport.config';

passport.use(GOOGLE_STRATEGY);
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