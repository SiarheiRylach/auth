const config = {};

config.redisStore = {
    url: process.env.REDIS_STORE_URI,
    secret: process.env.REDIS_STORE_SECRET || 'qwerty'
};

module.exports = config;