const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

//u should use here db to store credentials
const user = {
    username: 'test-name',
    password: 'test-password',
    id: 1
};

passport.use(new LocalStrategy((username, password, done)=>{
    findUser(username, (err, user)=>{
       if(err){
            return done(err);
       }
       if(!user){
           return done(null, false)
       }
       if(password !== user.password){
           return done(null, false);
       }
       return done(null, user)
    });
}));