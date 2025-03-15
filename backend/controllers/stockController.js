import StockPrice from "../models/stockModel.js";
import sliced from "../templates/Stocks.js";
//change
export const massFeeding = async (req, res) => {
    try {
        const bulkOps = sliced.map(stock => ({
            updateOne: {
                filter: { symbol: stock.symbol, date: stock.date },
                update: { $set: stock },
                upsert: true  // Prevent duplicate inserts
            }
        }));

        const result = await StockPrice.bulkWrite(bulkOps);
        console.log(`${result.upsertedCount} new stock prices inserted.`);
        console.log(`${result.modifiedCount} stock prices updated.`);

        res.status(200).json({
            message: `${result.upsertedCount} new stock prices inserted, ${result.modifiedCount} updated.`,
        });
    } catch (error) {
        console.error("Error inserting stock data:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getStockBySymbol = async (req, res) => {
    try {
        const { symbol } = req.params; // Extract symbol from request params

        if (!symbol) {
            return res.status(400).json({ message: "Stock symbol is required." });
        }

        const stocks = await StockPrice.find({ symbol }).sort({ date: -1 }); // Fetch and sort by latest date

        if (stocks.length === 0) {
            return res.status(404).json({ message: "No stock data found for the given symbol." });
        }

        res.status(200).json(stocks);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const removeDuplicateStocks = async (req, res) => {
    try {
        
        const duplicates = await StockPrice.aggregate([
            { $sort: { date: -1 } }, 
            {
                $group: {
                    _id: "$symbol", 
                    latestId: { $first: "$_id" }, 
                    duplicateIds: { $push: "$_id" } 
                }
            }
        ]);

      
        const deleteOps = duplicates.flatMap(stock =>
            stock.duplicateIds.slice(1).map(id => ({ deleteOne: { filter: { _id: id } } }))
        );

        
        if (deleteOps.length > 0) {
            const result = await StockPrice.bulkWrite(deleteOps);
            console.log(`✅ Removed ${result.deletedCount} duplicate stock entries.`);
        } else {
            console.log("✅ No duplicates found.");
        }

        res.status(200).json({ message: "Duplicate stock entries removed successfully." });
    } catch (error) {
        console.error("❌ Error removing duplicate stocks:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
