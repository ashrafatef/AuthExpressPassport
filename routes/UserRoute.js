const router = require("express").Router();
const userController = require("../controllers/UserController")

// user router routs 

router.route('/register')
        .post( userController.create );

router.route('/login')
        .post( userController.login);

router.route('/profile')
        .get(userController.index);

module.exports = router;