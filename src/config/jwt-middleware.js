const User = require("../models/user");
const JWT = require("passport-jwt");

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

require("dotenv").config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const passportAuth = (passport) => {
    try {
        passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
            console.log("req sent to strategy");
            const user = await User.findById(jwt_payload.id);
            // console.log(user.id);
            if(!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        }));
    } catch(err) {
        console.log(err);
        throw err;
    }
    
}

module.exports = passportAuth;