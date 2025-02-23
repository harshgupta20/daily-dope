const { Router } = require('express');
const Auth = require('../controllers/auth');
const router = Router();

router.post('/signin', new Auth().Signin);
router.post('/signup', new Auth().Signup);
router.post('/verify-top', new Auth().VerifyOtp);


module.exports = router;