import express from "express";
import { submitKYC, verifyKYC, getKYCDetails, getUserKYC } from "../controllers/kycController.js";


const router = express.Router();


router.post("/submit",  submitKYC);
router.put("/verify/:kycId", verifyKYC);
router.get("/all",  getKYCDetails);
router.get("/:userId", getUserKYC);
//change
export default router;
