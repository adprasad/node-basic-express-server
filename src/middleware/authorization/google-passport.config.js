import GoogleStrategy from 'passport-google-oauth20';
let googleCfg = require('dotenv').config({
    path: './src/middleware/authorization/.env'
});

if (googleCfg.error) {
    console.error("Unable to configure environment");
    throw googleCfg.error;
}
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


const GOOGLE_OPTS = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost:3443/v1/auth/google/callback",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
};

let GS = new GoogleStrategy(GOOGLE_OPTS, function (accessToken, refreshToken, profile, cb) {
    console.info("Result returned from google");
    console.info(accessToken);
    console.info(refreshToken);
    console.info(profile);
    return cb(null,profile);
});
export default GS;