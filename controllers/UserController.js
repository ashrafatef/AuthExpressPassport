const userService = require("../services/UserService")
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt-config");

module.exports = {
    create(req, res){
        userService.addNewUser(req.body.user)
                        .then(user=>{
                            console.log(user)
                            res.send(_.pick(user, ['fullName', 'email','age,','gender']))
                        })
                        .catch(err=>{
                            console.log(err)
                        })
    },
    index(req, res , next){

        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
              console.log(err);
            }
            if (info != undefined) {
              console.log(info.message);
              res.send(info.message);
            } else {
              console.log('user found in db from route');
              res.status(200).send({
                auth: true,
                data : user,
                message: 'user found in db',
              });
            }
          })(req, res, next);

    },
    search(){

    },
    login( req, res , next){

        const { body: { user } } = req;

        if(!user.email) {
            return res.status(422).json({
            errors: {
                email: 'is required',
            },
            });
        }

        if(!user.password) {
            return res.status(422).json({
            errors: {
                password: 'is required',
            },
            });
        }

        return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
            if(err) {
                return next(err);
            }

            if(passportUser) {
                let token = jwt.sign({id: passportUser.id},
                    jwtConfig.secret,
                    { 
                        expiresIn: '15m' // expires in 24 hours
                    }
                );
                // const user = passportUser;
                // user.token = passportUser.generateJWT();

                return res.status(200).json({ 
                    message : " login Suucessfully",
                    token : token,
                });
            }

            return res.status(400).send(info);
        })(req, res, next);

    }
};