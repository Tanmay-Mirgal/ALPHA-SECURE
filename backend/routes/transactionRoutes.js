import express from "express"
import {  createBuyOrder, createSellOrder, verifyPayment } from "../controllers/transactionController.js";
import { isKYCVerified, protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();
router.use(protectedRoute,isKYCVerified)

router.post("/buy-stock",createBuyOrder)
router.post("/sell-stock",createSellOrder)
router.post("/verify-payment" , verifyPayment)
//change
export default router ;