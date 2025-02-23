const { Router } = require('express');
const User = require('../controllers/User/Index');
const auth = require('../middleware/authMiddleware');
const router = Router();

router.post('/signin', new User().signin);
router.get('/', auth.authMiddleware, new User().GetUsers);


module.exports = router;