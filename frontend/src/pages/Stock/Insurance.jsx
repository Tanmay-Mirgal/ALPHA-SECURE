import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Shield, AlertCircle, FileText, RefreshCcw, Search, SlidersHorizontal, CheckCircle2, XCircle } from "lucide-react";
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

// Sample insurance data
const allPolicies = [
  { 
    name: "Basic Health Plan",
    policyNumber: "HP-2024-001",
    premium: "$250.00",
    coverage: "$500,000",
    type: "Health",
    status: "Active",
    isActive: true,
    renewalDate: "2025-01-15",
    claims: 2,
    deductible: "$1,000",
    provider: "BlueCross",
    lastClaim: "2024-02-10"
  },
  { 
    name: "Family Health Plus",
    policyNumber: "HP-2024-002",
    premium: "$450.00",
    coverage: "$1,000,000",
    type: "Health",
    status: "Active",
    isActive: true,
    renewalDate: "2025-03-20",
    claims: 1,
    deductible: "$2,000",
    provider: "Aetna",
    lastClaim: "2024-01-05"
  },
  { 
    name: "Term Life 20",
    policyNumber: "LP-2024-003",
    premium: "$150.00",
    coverage: "$750,000",
    type: "Life",
    status: "Active",
    isActive: true,
    renewalDate: "2025-06-10",
    claims: 0,
    deductible: "$0",
    provider: "MetLife",
    lastClaim: "N/A"
  },
  { 
    name: "Auto Premium Coverage",
    policyNumber: "AP-2024-004",
    premium: "$175.00",
    coverage: "$50,000",
    type: "Auto",
    status: "Pending Renewal",
    isActive: false,
    renewalDate: "2024-04-01",
    claims: 1,
    deductible: "$500",
    provider: "Progressive",
    lastClaim: "2023-12-15"
  },
  { 
    name: "Home Protection Plus",
    policyNumber: "HP-2024-005",
    premium: "$200.00",
    coverage: "$400,000",
    type: "Home",
    status: "Active",
    isActive: true,
    renewalDate: "2025-02-28",
    claims: 0,
    deductible: "$1,500",
    provider: "State Farm",
    lastClaim: "N/A"
  },
  { 
    name: "Dental Care Basic",
    policyNumber: "DP-2024-006",
    premium: "$75.00",
    coverage: "$10,000",
    type: "Dental",
    status: "Active",
    isActive: true,
    renewalDate: "2025-01-30",
    claims: 3,
    deductible: "$100",
    provider: "Delta Dental",
    lastClaim: "2024-02-20"
  },
  { 
    name: "Vision Care Plus",
    policyNumber: "VP-2024-007",
    premium: "$45.00",
    coverage: "$5,000",
    type: "Vision",
    status: "Expired",
    isActive: false,
    renewalDate: "2024-02-15",
    claims: 1,
    deductible: "$50",
    provider: "VSP",
    lastClaim: "2023-11-30"
  },
  { 
    name: "Business Liability",
    policyNumber: "BP-2024-008",
    premium: "$350.00",
    coverage: "$1,000,000",
    type: "Business",
    status: "Active",
    isActive: true,
    renewalDate: "2025-05-15",
    claims: 0,
    deductible: "$5,000",
    provider: "Hartford",
    lastClaim: "N/A"
  },
  { 
    name: "Pet Insurance Basic",
    policyNumber: "PP-2024-009",
    premium: "$35.00",
    coverage: "$15,000",
    type: "Pet",
    status: "Active",
    isActive: true,
    renewalDate: "2025-04-10",
    claims: 2,
    deductible: "$250",
    provider: "Pets Best",
    lastClaim: "2024-01-25"
  },
  { 
    name: "Travel Insurance Premium",
    policyNumber: "TP-2024-010",
    premium: "$85.00",
    coverage: "$100,000",
    type: "Travel",
    status: "Pending Activation",
    isActive: false,
    renewalDate: "2024-03-01",
    claims: 0,
    deductible: "$100",
    provider: "AIG",
    lastClaim: "N/A"
  }
];

const InsurancePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [policies, setPolicies] = useState(allPolicies);
  const [filteredPolicies, setFilteredPolicies] = useState(policies);
  
  const itemsPerPage = 6;
  const types = [...new Set(allPolicies.map(policy => policy.type))];
  const statuses = [...new Set(allPolicies.map(policy => policy.status))];
  
  // Filter policies based on search term and filters
  useEffect(() => {
    let results = policies.filter(policy => 
      (policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Apply type filter
    if (filterType !== "all") {
      results = results.filter(policy => policy.type === filterType);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter(policy => policy.status === statusFilter);
    }

    setFilteredPolicies(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, policies, filterType, statusFilter]);
  
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  
  // Get current policies
  const indexOfLastPolicy = currentPage * itemsPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - itemsPerPage;
  const currentPolicies = filteredPolicies.slice(indexOfFirstPolicy, indexOfLastPolicy);
  
  // Change page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate portfolio summary
  const portfolioSummary = policies.reduce((acc, policy) => {
    const premium = parseFloat(policy.premium.replace('$', ''));
    const coverage = parseFloat(policy.coverage.replace('$', '').replace(/,/g, ''));
    return {
      totalPremiums: acc.totalPremiums + premium,
      totalCoverage: acc.totalCoverage + coverage,
      activePolicies: acc.activePolicies + (policy.isActive ? 1 : 0),
      totalClaims: acc.totalClaims + policy.claims
    };
  }, { totalPremiums: 0, totalCoverage: 0, activePolicies: 0, totalClaims: 0 });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50 min-h-screen">
      {/* Portfolio Summary */}
      

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by policy name or number..."
            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Insurance type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(filterType !== "all" || statusFilter !== "all") && (
        <div className="flex gap-2 mb-4">
          {filterType !== "all" && (
            <Badge variant="secondary" className="bg-slate-700">
              {filterType}
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="bg-slate-700">
              {statusFilter}
            </Badge>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPolicies.map((policy, index) => (
          <Card 
            key={index} 
            className="border border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="py-2 px-4 border-b border-slate-700">
              <CardTitle className="text-base flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white font-bold">{policy.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{policy.policyNumber}</span>
                    <Badge variant="default" className="text-xs bg-transparent">
                      {policy.type}
                    </Badge>
                  </div>
                </div>
                <Shield className="h-4 w-4 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-bold text-white">{policy.premium}/mo</p>
                <Badge className={`${
                  policy.status === 'Active' ? 'bg-green-950/50 text-green-400' :
                  policy.status === 'Pending Renewal' ? 'bg-yellow-950/50 text-yellow-400' :
                  'bg-red-950/50 text-red-400'
                }`}>
                  {policy.status}
                </Badge>
              </div>
              
              <div className="space-y-1 mt-2 border-t border-slate-700 pt-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Coverage:</span>
                  <span className="font-medium text-white">{policy.coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Deductible:</span>
                  <span className="font-medium text-white">{policy.deductible}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Provider:</span>
                  <span className="font-medium text-white">{policy.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Claims:</span>
                  <span className="font-medium text-white">{policy.claims}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 p-2 bg-slate-800/30">
              <button
                className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white font-medium py-1.5 px-2 rounded-md transition-colors flex items-center justify-center gap-1 text-sm"
              >
                <FileText className="h-3 w-3" />
                <span>View Details</span>
              </button>
              <button
                className="flex-1 bg-emerald-600/80 hover:bg-emerald-600 text-white font-medium py-1.5 px-2 rounded-md transition-colors flex items-center justify-center gap-1 text-sm"
              >
                <RefreshCcw className="h-3 w-3" />
                <span>Renew</span>
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredPolicies.length === 0 && (
        <div className="text-center py-8 text-slate-400 bg-slate-800/30 rounded-lg">
          <SlidersHorizontal className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No policies match your current filters.</p>
          <p className="text-sm">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      
      {filteredPolicies.length > 0 && (
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

export default InsurancePage;