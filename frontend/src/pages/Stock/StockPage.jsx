import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card"
import { TrendingUp, TrendingDown, ShoppingCart, ArrowLeftRight, Search, SlidersHorizontal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";

// Sample stock data with added symbols
const allStocks = [
  { name: "Apple", symbol: "AAPL", price: "$175.23", change: "+1.25%", isPositive: true, owned: 5, avgBuyPrice: 170.50, sector: "Technology", high: "$178.00", low: "$172.50", open: "$173.10", close: "$175.23" },
  { name: "Tesla", symbol: "TSLA", price: "$245.67", change: "-0.85%", isPositive: false, owned: 2, avgBuyPrice: 250.20, sector: "Automotive", high: "$250.00", low: "$243.00", open: "$248.50", close: "$245.67" },
  { name: "Amazon", symbol: "AMZN", price: "$135.12", change: "+0.42%", isPositive: true, owned: 8, avgBuyPrice: 130.75, sector: "Consumer", high: "$137.00", low: "$134.00", open: "$134.50", close: "$135.12" },
  { name: "Microsoft", symbol: "MSFT", price: "$310.05", change: "-1.15%", isPositive: false, owned: 3, avgBuyPrice: 315.30, sector: "Technology", high: "$315.00", low: "$308.00", open: "$312.50", close: "$310.05" },
  { name: "Google", symbol: "GOOGL", price: "$2750.55", change: "+0.75%", isPositive: true, owned: 1, avgBuyPrice: 2700.00, sector: "Technology", high: "$2780.00", low: "$2730.00", open: "$2745.00", close: "$2750.55" },
  { name: "Meta", symbol: "META", price: "$380.21", change: "-0.50%", isPositive: false, owned: 4, avgBuyPrice: 385.60, sector: "Technology", high: "$385.00", low: "$378.00", open: "$382.50", close: "$380.21" },
  { name: "Netflix", symbol: "NFLX", price: "$412.88", change: "+2.15%", isPositive: true, owned: 2, avgBuyPrice: 400.00, sector: "Entertainment", high: "$420.00", low: "$410.00", open: "$411.50", close: "$412.88" },
  { name: "AMD", symbol: "AMD", price: "$98.45", change: "-0.35%", isPositive: false, owned: 10, avgBuyPrice: 99.00, sector: "Technology", high: "$100.00", low: "$97.50", open: "$98.80", close: "$98.45" },
  { name: "Nvidia", symbol: "NVDA", price: "$865.32", change: "+3.25%", isPositive: true, owned: 3, avgBuyPrice: 800.00, sector: "Technology", high: "$875.00", low: "$850.00", open: "$855.00", close: "$865.32" },
  { name: "Intel", symbol: "INTC", price: "$45.67", change: "-1.20%", isPositive: false, owned: 15, avgBuyPrice: 48.30, sector: "Technology", high: "$47.00", low: "$45.00", open: "$46.50", close: "$45.67" },
  { name: "IBM", symbol: "IBM", price: "$142.35", change: "+0.65%", isPositive: true, owned: 7, avgBuyPrice: 140.00, sector: "Technology", high: "$145.00", low: "$141.00", open: "$142.00", close: "$142.35" },
  { name: "Oracle", symbol: "ORCL", price: "$112.90", change: "+0.18%", isPositive: true, owned: 6, avgBuyPrice: 110.50, sector: "Technology", high: "$115.00", low: "$111.50", open: "$112.30", close: "$112.90" },
];


const StockTradingCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [portfolio, setPortfolio] = useState(allStocks.map(stock => ({
    ...stock,
    currentPrice: parseFloat(stock.price.replace('$', '')),
  })));
  const [filteredStocks, setFilteredStocks] = useState(portfolio);
  
  const itemsPerPage = 6;
  const sectors = [...new Set(allStocks.map(stock => stock.sector))];
  
  // Filter stocks based on search term and filters
  useEffect(() => {
    let results = portfolio.filter(stock => 
      (stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Apply sector filter
    if (sectorFilter !== "all") {
      results = results.filter(stock => stock.sector === sectorFilter);
    }

    // Apply performance filter
    switch (filterType) {
      case "gainers":
        results = results.filter(stock => stock.isPositive);
        break;
      case "losers":
        results = results.filter(stock => !stock.isPositive);
        break;
      case "owned":
        results = results.filter(stock => stock.owned > 0);
        break;
      default:
        break;
    }

    setFilteredStocks(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, portfolio, filterType, sectorFilter]);
  
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  
  const handleBuy = (stockName) => {
    setPortfolio(prev => 
      prev.map(stock => 
        stock.name === stockName 
          ? { ...stock, owned: stock.owned + 1 } 
          : stock
      )
    );
  };
  
  const handleSell = (stockName) => {
    setPortfolio(prev => 
      prev.map(stock => 
        stock.name === stockName && stock.owned > 0
          ? { ...stock, owned: stock.owned - 1 } 
          : stock
      )
    );
  };
  
  // Calculate profit/loss
  const calculateProfit = (stock) => {
    const currentPrice = parseFloat(stock.price.replace('$', ''));
    const totalCost = stock.avgBuyPrice * stock.owned;
    const currentValue = currentPrice * stock.owned;
    return currentValue - totalCost;
  };
  
  // Get current stocks
  const indexOfLastStock = currentPage * itemsPerPage;
  const indexOfFirstStock = indexOfLastStock - itemsPerPage;
  const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);
  
  // Change page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate portfolio summary
  const portfolioSummary = portfolio.reduce((acc, stock) => {
    const profit = calculateProfit(stock);
    return {
      totalValue: acc.totalValue + (parseFloat(stock.price.replace('$', '')) * stock.owned),
      totalProfit: acc.totalProfit + profit,
      totalStocks: acc.totalStocks + stock.owned
    };
  }, { totalValue: 0, totalProfit: 0, totalStocks: 0 });

  return (
    <div className="flex flex-col gap-4 p-4 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50 min-h-screen">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <p className="text-slate-400 text-sm">Portfolio Value</p>
            <p className="text-2xl font-bold text-white">${portfolioSummary.totalValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <p className="text-slate-400 text-sm">Total Profit/Loss</p>
            <p className={`text-2xl font-bold ${portfolioSummary.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${portfolioSummary.totalProfit.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <p className="text-slate-400 text-sm">Stocks Owned</p>
            <p className="text-2xl text-white font-bold">{portfolioSummary.totalStocks}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by company name or symbol..."
            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stocks</SelectItem>
              <SelectItem value="gainers">Gainers</SelectItem>
              <SelectItem value="losers">Losers</SelectItem>
              <SelectItem value="owned">Owned</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(filterType !== "all" || sectorFilter !== "all") && (
        <div className="flex gap-2 mb-4">
          {filterType !== "all" && (
            <Badge variant="secondary" className="bg-slate-700">
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Badge>
          )}
          {sectorFilter !== "all" && (
            <Badge variant="secondary" className="bg-slate-700">
              {sectorFilter}
            </Badge>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentStocks.map((stock, index) => {
          const profit = calculateProfit(stock);
          const profitPercentage = stock.owned > 0 
            ? ((parseFloat(stock.price.replace('$', '')) - stock.avgBuyPrice) / stock.avgBuyPrice * 100).toFixed(2)
            : 0;
            
          return (
            <Card 
              key={index} 
              className="border border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="py-2 px-4 border-b border-slate-700">
                <CardTitle className="text-base flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-white font-bold">{stock.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">{stock.symbol}</span>
                      <Badge variant="default" className="text-xs bg-transparent">
                        {stock.sector}
                      </Badge>
                    </div>
                  </div>
                  {stock.isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3 px-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-bold text-white">{stock.price}</p>
                  <p className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stock.isPositive ? "bg-green-950/50 text-green-400" : "bg-red-950/50 text-red-400"
                  }`}>
                    {stock.change}
                  </p>
                </div>
                
                <div className="space-y-1 mt-2 border-t border-slate-700 pt-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Owned:</span>
                    <span className="font-medium">{stock.owned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Price:</span>
                    <span className="font-medium">${stock.avgBuyPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">P/L:</span>
                    <span className={`font-medium ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                      ${profit.toFixed(2)} ({profitPercentage}%)
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 p-2 bg-slate-800/30">
                <button
                  onClick={() => handleBuy(stock.name)}
                  className="flex-1 bg-green-600/80 hover:bg-green-600 text-white font-medium py-1.5 px-2 rounded-md transition-colors flex items-center justify-center gap-1 text-sm"
                >
                  <ShoppingCart className="h-3 w-3" />
                  <span>Buy</span>
                </button>
                <button
                  onClick={() => handleSell(stock.name)}
                  disabled={stock.owned <= 0}
                  className={`flex-1 bg-red-600/80 hover:bg-red-600 text-white font-medium py-1.5 px-2 rounded-md transition-colors flex items-center justify-center gap-1 text-sm ${
                    stock.owned <= 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <ArrowLeftRight className="h-3 w-3" />
                  <span>Sell</span>
                </button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {filteredStocks.length === 0 && (
        <div className="text-center py-8 text-slate-400 bg-slate-800/30 rounded-lg">
          <SlidersHorizontal className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No stocks match your current filters.</p>
          <p className="text-sm">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      
      {filteredStocks.length > 0 && (
        <Pagination className="mx-auto mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) goToPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              
              if (
                pageNumber === 1 || 
                pageNumber === totalPages || 
                Math.abs(pageNumber - currentPage) <= 1
              ) {
                return (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(pageNumber);
                      }}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              if (
                (pageNumber === 2 && currentPage > 3) || 
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={i}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) goToPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default StockTradingCards;
