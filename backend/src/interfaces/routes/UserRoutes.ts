import express from 'express';
import { UserController } from '../controllers/UserController';
import { ProfileController } from '../controllers/profileController';
import checkTokenBlacklist from '../middlewares/TokenBlocklist';

const router = express.Router();
router.use(checkTokenBlacklist);

router.post ('/signup',UserController.signUp);
router.post ('/google-signup',UserController.googleSignUp)
router.post ('/verify-otp',UserController.verifyOtp);
router.post ('/resend-otp', UserController.resendOtp);
router.post('/login', UserController.login);

router.post('/setup', ProfileController.setupProfile);
router.put ('/update', ProfileController.updateProfile);
router.get('/:userId/:role', ProfileController.getProfile);


export default router;