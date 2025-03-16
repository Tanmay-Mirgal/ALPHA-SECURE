import express from 'express';
import { loginController, logoutController, signupController } from '../controllers/authController.js';
import { verifyKYC } from '../controllers/kycController.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';

const router = express.Router();


router.post("/register",signupController)
router.post("/login",loginController)
router.post("/logout",logoutController)
router.post("/verify-user",protectedRoute,verifyKYC)

//change
export default router;