const passport = require('passport'),
      bcrypt = require('bcrypt'),
      LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');
const saltRounds = 10;
const myPlaintextPassword = 'my-password';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);


//u should use here db to store credentials
const user = {
    username: 'test-name',
    passwordHash,
    id: 1
};

function findUser (username, callback) {
    if (username === user.username) {
        return callback(null, user)
    }
    return callback(null)
}

passport.serializeUser(function (user, cb) {
    cb(null, user.username)
});

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
});

function initPassport () {
    passport.use(new LocalStrategy((username, password, done) => {
        findUser(username, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log("User is not found");
                return done(null, false)
            }

            bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                if (err) {
                    return done(err)
                }
                if (!isValid) {
                    return done(null, false)
                }
                return done(null, user)
            })

        });
    }));

    passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;

