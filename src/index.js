import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
// END OF GENERAL IMPORTS
import router from './routes'
// END of APP IMPORTS
let app = express();

/**
 * Do environment configuration
 */
const envCfg = require('dotenv').config();
if( envCfg.error ){
    console.error("Unable to configure environment");
    throw envCfg.error;
}
const PORT = process.env.XPORT;
console.debug(`Environment Configured: \n${envCfg.parsed}`);
/**
 * Configure Routing
 */


/**
 * setup listening express and bodyParser for server
 */
app.server = http.createServer(app);
app.use(bodyParser.json({
    limit: process.env.BODY_LIMIT
}));

// Configure security

// Configure healthcheck routes
app.use(function(err, req, res, next) 
{
    console.error(err.stack);
    res.status(500).send('Server error occured.');
});

app.use('/v1', router);

app.server.listen(PORT, () => {
    console.info(`Server is running at ${app.server.address().port}`);
});

export default app;
