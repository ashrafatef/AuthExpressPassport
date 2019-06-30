const bycrpt = require("bcrypt")
const User = require("../models/User")
const db = require("../lib/db")

module.exports = {
    async addNewUser(newUser){
        let user = await User.findOne({ email: newUser.email });

        if(user){
            Promise.reject(user)
        }else{
            user = new User(_.pick(newUser, ['fullName', 'email', 'password','age,','gender']));
            const salt = await bycrpt.genSalt(10);
            user.password = await bycrpt.hash(user.password, salt);
            return User.create(user);
        }
    },
    login(userInfo){

    }
}