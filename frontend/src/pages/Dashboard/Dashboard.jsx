import React, { useState } from 'react';
import {
    Search, Filter, CreditCard, BarChart2, RefreshCcw, Shield, ArrowUp, ArrowDown, ChevronDown,
    TrendingUp, DollarSign, Briefcase, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../components/ui/pagination";

const InfoCard = ({ icon: Icon, title, value, trend, bgColor, borderColor, iconColor }) => {
    return (
        <Card className={`${bgColor} ${borderColor} backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300`}>
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-300 mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-white">{value}</h3>
                        {trend && (
                            <div className={`flex items-center mt-2 text-xs ${trend.positive ? 'text-green-300' : 'text-red-300'}`}>
                                {trend.positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                                <span>{trend.value}</span>
                            </div>
                        )}
                    </div>
                    <div className={`p-3 rounded-lg ${bgColor} border ${borderColor}`}>
                        <Icon className={`h-6 w-6 ${iconColor}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const Dashboard = () => {
    // State for search query and selected filter
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Expanded transaction data
   const transactionData = [
        { id: 1, stock: "AAPL", action: "bought", quantity: 5, price: "₹18,500", date: "2025-03-15", time: "10:30 AM" },
        { id: 2, stock: "MSFT", action: "sold", quantity: 3, price: "₹9,200", date: "2025-03-14", time: "2:15 PM" },
        { id: 3, stock: "GOOGL", action: "bought", quantity: 2, price: "₹26,400", date: "2025-03-13", time: "11:45 AM" },
        { id: 4, stock: "AMZN", action: "sold", quantity: 8, price: "₹14,800", date: "2025-03-12", time: "9:20 AM" },
        { id: 5, stock: "TSLA", action: "bought", quantity: 10, price: "₹21,300", date: "2025-03-11", time: "3:50 PM" },
        { id: 6, stock: "META", action: "bought", quantity: 7, price: "₹25,100", date: "2025-03-10", time: "11:20 AM" },
        { id: 7, stock: "NFLX", action: "sold", quantity: 4, price: "₹12,600", date: "2025-03-09", time: "1:35 PM" },
        { id: 8, stock: "NVDA", action: "bought", quantity: 3, price: "₹34,200", date: "2025-03-08", time: "10:15 AM" },
        { id: 9, stock: "AMD", action: "sold", quantity: 12, price: "₹8,400", date: "2025-03-07", time: "2:45 PM" },
        { id: 10, stock: "INTC", action: "bought", quantity: 15, price: "₹10,500", date: "2025-03-06", time: "9:50 AM" },
        { id: 11, stock: "IBM", action: "sold", quantity: 6, price: "₹16,800", date: "2025-03-05", time: "3:40 PM" },
        { id: 12, stock: "ORCL", action: "bought", quantity: 8, price: "₹13,600", date: "2025-03-04", time: "11:05 AM" },
        { id: 13, stock: "CRM", action: "sold", quantity: 5, price: "₹22,500", date: "2025-03-03", time: "1:25 PM" },
        { id: 14, stock: "ADBE", action: "bought", quantity: 2, price: "₹27,800", date: "2025-03-02", time: "10:10 AM" },
        { id: 15, stock: "PYPL", action: "sold", quantity: 9, price: "₹11,700", date: "2025-03-01", time: "2:30 PM" },
        { id: 16, stock: "AAPL", action: "sold", quantity: 7, price: "₹26,250", date: "2025-02-28", time: "10:00 AM" },
        { id: 17, stock: "GOOGL", action: "bought", quantity: 4, price: "₹52,800", date: "2025-02-27", time: "3:15 PM" },
        { id: 18, stock: "TSLA", action: "sold", quantity: 6, price: "₹12,780", date: "2025-02-26", time: "11:30 AM" },
        { id: 19, stock: "AMZN", action: "bought", quantity: 3, price: "₹5,550", date: "2025-02-25", time: "1:40 PM" },
        { id: 20, stock: "MSFT", action: "sold", quantity: 10, price: "₹30,667", date: "2025-02-24", time: "9:45 AM" },
    ];

    // Filter transactions based on searchQuery and selectedFilter
    const filteredTransactions = transactionData.filter((transaction) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        switch (selectedFilter) {
            case 'date':
                return transaction.date.toLowerCase().includes(query);
            case 'stock':
                return transaction.stock.toLowerCase().includes(query);
            case 'action':
                return transaction.action.toLowerCase().includes(query);
            case 'value':
                return transaction.price.toLowerCase().includes(query) || String(transaction.quantity).toLowerCase().includes(query);
            default:
                // 'all' filter: search in all fields
                return Object.values(transaction).some(val => String(val).toLowerCase().includes(query));
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 3;

        if (totalPages <= maxVisiblePages + 2) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 2) {
                // Add ellipsis if current page is far from start
                pages.push('ellipsis1');
            }

            // Calculate range around current page
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust range to show maxVisiblePages
            if (end - start + 1 < maxVisiblePages) {
                if (start === 2) {
                    end = Math.min(totalPages - 1, start + maxVisiblePages - 1);
                } else if (end === totalPages - 1) {
                    start = Math.max(2, end - maxVisiblePages + 1);
                }
            }

            // Add calculated range
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 1) {
                // Add ellipsis if current page is far from end
                pages.push('ellipsis2');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="min-h-screen w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
            {/* Fullscreen container */}
            <div className="w-full h-full rounded-xl bg-gray-800/30 backdrop-blur-md border border-gray-700/50 shadow-xl overflow-hidden">

                {/* Header Cards */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoCard
                        icon={BarChart2}
                        title="Number of Stocks"
                        value="24"
                        trend={{ positive: true, value: "+3 this month" }}
                        bgColor="bg-blue-500/10"
                        borderColor="border-blue-500/30"
                        iconColor="text-blue-300"
                    />

                    <InfoCard
                        icon={DollarSign}
                        title="Revenue in rupees"
                        value="₹156,800"
                        trend={{ positive: true, value: "+12.4%" }}
                        bgColor="bg-green-500/10"
                        borderColor="border-green-500/30"
                        iconColor="text-green-300"
                    />

                    <InfoCard
                        icon={Briefcase}
                        title="Insurance policies and mutual funds"
                        value="8 Active"
                        trend={{ positive: false, value: "-1 this week" }}
                        bgColor="bg-purple-500/10"
                        borderColor="border-purple-500/30"
                        iconColor="text-purple-300"
                    />
                </div>

                {/* Search bar & Filters */}
                <div className="p-4 flex flex-col md:flex-row gap-2 border-t border-b border-gray-700/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder={`Search ${selectedFilter !== 'all' ? `by ${selectedFilter}` : 'stocks, transactions...'}`}
                            className="pl-10 bg-gray-800/30 border-gray-700/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 text-white">
                                <Filter className="h-4 w-4 mr-2" />
                                {selectedFilter === 'all'
                                    ? 'Filters: All'
                                    : `Filters: ${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}`}
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800/90 border-gray-700/50 text-white">
                            <DropdownMenuItem onClick={() => setSelectedFilter('all')} className="focus:bg-gray-700/50">All</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter('date')} className="focus:bg-gray-700/50">By Date</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter('stock')} className="focus:bg-gray-700/50">By Stock</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter('action')} className="focus:bg-gray-700/50">By Action</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedFilter('value')} className="focus:bg-gray-700/50">By Value</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Main content */}
                <div className="p-4 grid gap-6">
                    {/* Transaction Log with Data Table */}
                    <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium text-white flex items-center justify-between">
                                <div className="flex items-center">
                                    <BarChart2 className="h-5 w-5 mr-2 text-blue-300" />
                                    Transaction Logs
                                </div>
                                <div className="text-sm text-gray-400">
                                    {filteredTransactions.length} transactions
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md overflow-auto">
                                <Table>
                                    <TableHeader className="bg-gray-800/50">
                                        <TableRow className="hover:bg-gray-700/50 border-b border-gray-700/50">
                                            <TableHead className="text-white">Stock</TableHead>
                                            <TableHead className="text-white">Action</TableHead>
                                            <TableHead className="text-white">Quantity</TableHead>
                                            <TableHead className="text-white">Price</TableHead>
                                            <TableHead className="text-white">Date</TableHead>
                                            <TableHead className="text-white">Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>



                                        {paginatedTransactions.map((transaction) => (
                                            <TableRow key={transaction.id} className="hover:bg-gray-700/30 border-b border-gray-700/30">
                                                <TableCell className="font-medium text-white">{transaction.stock}</TableCell>
                                                <TableCell>
                                                    {transaction.action === "bought" ? (
                                                        <Badge className="bg-green-500/20 text-green-200 border-green-500/30 flex items-center gap-1">
                                                            <ArrowUp className="h-3 w-3" /> Bought
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-red-500/20 text-red-200 border-red-500/30 flex items-center gap-1">
                                                            <ArrowDown className="h-3 w-3" /> Sold
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-white">{transaction.quantity}</TableCell>
                                                <TableCell className="text-white">{transaction.price}</TableCell>
                                                <TableCell className="text-gray-300">{transaction.date}</TableCell>
                                                <TableCell className="text-gray-300">{transaction.time}</TableCell>
                                            </TableRow>
                                        ))}
                                        {paginatedTransactions.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-gray-400">
                                                    No transactions found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination Component */}
                            {filteredTransactions.length > itemsPerPage && (
                                <div className="mt-4">
                                    <Pagination>
                                        <PaginationContent className="text-white">
                                            {/* Previous Page Button */}
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-700/50'} bg-gray-800/30 border border-gray-700/50`}
                                                />
                                            </PaginationItem>

                                            {/* Page Numbers */}
                                            {getPageNumbers().map((page, index) => (
                                                page === 'ellipsis1' || page === 'ellipsis2' ? (
                                                    <PaginationItem key={`ellipsis-${index}`}>
                                                        <PaginationEllipsis className="text-gray-400" />
                                                    </PaginationItem>
                                                ) : (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            onClick={() => handlePageChange(page)}
                                                            isActive={page === currentPage}
                                                            className={`
              ${page === currentPage ? 'bg-blue-500/30 border-blue-500/50 text-white' : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/50 text-gray-300'}
              border
            `}
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            ))}

                                            {/* Next Page Button */}
                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-700/50'} bg-gray-800/30 border border-gray-700/50`}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard