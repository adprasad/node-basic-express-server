// Used to combine routes
import express from 'express';
import { BASE_ROUTER_PATH } from './router.const';
import health from './health';

let router = express();

console.debug(`Defined: ${BASE_ROUTER_PATH.HEALTH}`);
router.use(BASE_ROUTER_PATH.HEALTH, health());

export default router;