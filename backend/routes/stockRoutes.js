import express from "express"
import { massFeeding , getStockBySymbol, removeDuplicateStocks, getAllStocks } from "../controllers/stockController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router()

router.post("/mass-feed-stock-data" , massFeeding)
router.get("/get-stock-by-symbol/:symbol",protectedRoute,getStockBySymbol)
router.get("/get-all-stock",protectedRoute,getAllStocks)
router.delete("/remove-duplicates",removeDuplicateStocks)
// router.get("/get-user-stocks",protectedRoute,getUserStock)
//change
export default router;
