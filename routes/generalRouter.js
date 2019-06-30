const router = require("express").Router()

const generalController = require("../controllers/GeneralController");

router.route('/')
        .get(generalController.home);

module.exports = router;