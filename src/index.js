import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import session from 'express-session';
// END OF GENERAL IMPORTS
import passport from './middleware/authorization/passport.config';
import router from './routes';
import secure_router from './secure_routes';
// END of APP IMPORTS
let app = express();
let app_secure = express();
/**
 * Do environment configuration
 */
const envCfg = require('dotenv').config();
if (envCfg.error) {
    console.error("Unable to configure environment");
    throw envCfg.error;
}
const PORT = process.env.XPORT;
const SECURE_PORT = process.env.XSPORT;
console.debug(`Environment Configured: \n${envCfg.parsed}`);

/**
 * setup listening express and bodyParser for server
 */
app.server = http.createServer(app);
app.use(bodyParser.json({
    limit: process.env.BODY_LIMIT
}));

// Configure security
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session())

// Configure healthcheck routes
app.use(function (err, req, res, next) {
    if( process.env.env === 'development'){
        console.error(err.stack);
    }
    res.status( err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// CONFIGURE SECURE SERVER
if (process.env.ENABLE_SSL === true || process.env.ENABLE_SSL === 'true') {
    const options = {
        key: fs.readFileSync(process.env.TSL_KEY_FILE),
        cert: fs.readFileSync(process.env.TSL_CERT_FILE)
    }
    https.createServer(options, app).listen(SECURE_PORT, () => {
        console.info(`Server is running at ${SECURE_PORT}`);
    });
    app.use('/v1', secure_router(passport) );
}

app.use('/v1', router);

// TODO: Middleware for security
app.server.listen(PORT, () => {
    console.info(`Server is running at ${app.server.address().port}`);
});


export default { app, app_secure };