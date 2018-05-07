let jwtCfg = require('dotenv').config({
    path: './src/middleware/authorization/.env'
});

if (jwtCfg.error) {
    console.error("Unable to configure environment");
    throw jwtCfg.error;
}
const JWT_SECRET = process.env.JWT_SECRET;

export default () => {
    return {
        jwtSecret: JWT_SECRET,
        jwtSession: {
            session: false
        }
    }
};