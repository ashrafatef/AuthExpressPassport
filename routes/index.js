const router = require("express").Router()

router.use('/', require("./generalRouter"));

router.use('/users' , require("./UserRoute"))

module.exports = router;