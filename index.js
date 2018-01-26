const express = require('express'),
      passport = require('passport'),
      session = require('express-session'),
      RedisStore = require('connect-redis')(session);

const app = express();

app.use(session({
    store: new RedisStore({
        url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());