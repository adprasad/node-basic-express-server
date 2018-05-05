import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
// END OF GENERAL IMPORTS
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
 * Configure Routing
 */


/**
 * setup listening express and bodyParser for server
 */
app.server = http.createServer(app);
// CONFIGURE SECURE SERVER
if (process.env.ENABLE_SSL === true || process.env.ENABLE_SSL === 'true') {
    const options = {
        key: fs.readFileSync(process.env.TSL_KEY_FILE),
        cert: fs.readFileSync(process.env.TSL_CERT_FILE)
    }
    app_secure.server = https.createServer(options, app);
    // TODO: Configure secure routes
    app_secure.use(bodyParser.json({
        limit: process.env.BODY_LIMIT
    }));
    
    // Configure security
    app_secure.use('/v1', secure_router);

    // Configure healthcheck routes
    app_secure.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Server error occured.');
    });    
    app_secure.server.listen(SECURE_PORT, () => {
        console.info(`Server is running at ${app_secure.server.address().port}`);
    });
}

app.use(bodyParser.json({
    limit: process.env.BODY_LIMIT
}));

// Configure security

// Configure healthcheck routes
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server error occured.');
});

app.use('/v1', router);
// TODO: Middleware for security
app.server.listen(PORT, () => {
    console.info(`Server is running at ${app.server.address().port}`);
});


export default { app, app_secure };