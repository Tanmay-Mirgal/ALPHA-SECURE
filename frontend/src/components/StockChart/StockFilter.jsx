import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';



const SearchFilters= ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  sectorFilter,
  setSectorFilter,
  sectors,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <Input
          type="text"
          placeholder="Search by symbol..."
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
          </SelectContent>
        </Select>

        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700">
            <SelectValue placeholder="Select exchange" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Exchanges</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;