// Used to combine routes
import express from 'express';
import { BASE_ROUTER_PATH } from './router.const';
import health from './health';
import google from './google-auth';
import auth from './auth';

let secure_router = express();

secure_router.use(BASE_ROUTER_PATH.HEALTH, health);
secure_router.use(BASE_ROUTER_PATH.GOOGLE, google);
secure_router.use(BASE_ROUTER_PATH.AUTH, auth);

export default secure_router;