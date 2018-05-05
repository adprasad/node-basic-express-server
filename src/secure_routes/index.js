// Used to combine routes
import express from 'express';
import { BASE_ROUTER_PATH } from './router.const';
import health from './health';

let secure_router = express();

console.debug(`Defined: ${BASE_ROUTER_PATH.HEALTH}`);
secure_router.use(BASE_ROUTER_PATH.HEALTH, health());

export default secure_router;