import express from "express"
import { massFeeding , getStockBySymbol, removeDuplicateStocks } from "../controllers/stockController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router()

router.post("/mass-feed-stock-data" , massFeeding)
router.get("/get-stock-by-symbol/:symbol",protectedRoute,getStockBySymbol)
router.delete("/remove-duplicates",removeDuplicateStocks)
//change
export default router;
