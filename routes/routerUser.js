const { Router} = require('express');
const router = Router()
const {home, getAcount} = require("../controllers/userController.js")

router.get("/", home);

router.get("/micuenta",  getAcount);

router.post('/login', home);

module.exports = router;

