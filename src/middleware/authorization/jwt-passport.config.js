import jwtConfig from './jwt.config';
let pJwt = require('passport-jwt');
let JwtStrategy = pJwt.Strategy;
let jwtFromRequestFn = pJwt.ExtractJwt.fromAuthHeaderAsBearerToken();

const JWT_PARAMS = {
    secretOrKey: jwtConfig().jwtSecret,
    jwtFromRequest: jwtFromRequestFn
};

const JWT = new JwtStrategy(JWT_PARAMS, function (payload, done) {
    //var user = users[payload.id] || null;
    console.info("In JWT verifier");
    console.info(payload);
    
    if (payload) {
        return done(null, payload);
    }
    return done(new Error("User not found"), null);

});

export default JWT;