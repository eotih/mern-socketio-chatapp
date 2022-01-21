const router = require('express').Router();
const { catchErrors } = require('../handlers/error.handlers');
const { createChatroom, show } = require('../controllers/room.controller');
const auth = require('../middlewares/auth.middlewares');

router.get("/", auth, catchErrors(show));
router.post("/", auth, catchErrors(createChatroom));


module.exports = router