const router = require('express').Router();
const { catchErrors } = require('../handlers/error.handlers');
const { login, register } = require('../controllers/user.controller');

router.post("/login", catchErrors(login));
router.post("/register", catchErrors(register));


module.exports = router