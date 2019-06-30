const jwtConfig = require("./jwt-config");
const bcrypt = require("bcrypt");

const passport =  require("passport"),
      localStrategy = require("passport-local"),
      User = require("../models/User"),
      jwtStrategy = require("passport-jwt").Strategy,
      extractJwt = require("passport-jwt").ExtractJwt;

  passport.use("local" , new localStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    },(username , password , done)=>{
        try{
            User.findOne({ email: username})
                .then(user=>{
                    if(!user){
                        return done(null , false,{message: "no user with this email"})
                    }else{
                        bcrypt.compare(password , user.password).then(res=>{
                            if(!res){
                                return done(null , false,{message: "no user with this email"})
                            }
                            console.log("user authenticated")
                            return done(null , user);
                        })
                    }
                })
                .catch(err=>{
                    console.log("find catch: "+ err)
                })
        }catch(err){

        }
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id); 
       // where is this user.id going? Are we supposed to access this anywhere?
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    const opts = {
        jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtConfig.secret,
    };

    passport.use(
        'jwt',
        new jwtStrategy(opts, (jwt_payload, done) => {
          try {
            User.findOne({
                "_id": jwt_payload.id,
            }).then(user => {
              if (user) {
                console.log('user found in db in passport');
                // note the return removed with passport JWT - add this return for passport local
                done(null, user);
              } else {
                console.log('user not found in db');
                done(null, false);
              }
            });
          } catch (err) {
            done(err);
          }
        }),
    );
      