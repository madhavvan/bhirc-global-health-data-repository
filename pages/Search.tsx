import React, { useState, useEffect } from 'react';
import { getDatasets } from '../services/datasetService';
import DatasetCard from '../components/DatasetCard';
import { Dataset, FilterState } from '../types';
import { CATEGORIES, SOURCE_TYPES, REGIONS } from '../mockData';
import { Filter, Search as SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    sourceTypes: [],
    regions: []
  });

  useEffect(() => {
    setLoading(true);
    getDatasets(filters).then((data) => {
      setDatasets(data);
      setLoading(false);
    });
  }, [filters]);

  const handleCheckboxChange = (group: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[group] as string[];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [group]: updated };
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters(prev => ({...prev, searchQuery: e.target.value}));
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center space-x-2 text-slate-900 font-semibold mb-4 border-b pb-2">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Categories</h4>
                    <div className="space-y-2">
                        {CATEGORIES.map(c => (
                            <label key={c} className="flex items-center text-sm text-slate-600">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox h-4 w-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                                    checked={filters.categories.includes(c)}
                                    onChange={() => handleCheckboxChange('categories', c)}
                                />
                                <span className="ml-2">{c}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Source Type */}
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Source Type</h4>
                    <div className="space-y-2">
                        {SOURCE_TYPES.map(s => (
                            <label key={s} className="flex items-center text-sm text-slate-600">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox h-4 w-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                                    checked={filters.sourceTypes.includes(s)}
                                    onChange={() => handleCheckboxChange('sourceTypes', s)}
                                />
                                <span className="ml-2">{s}</span>
                            </label>
                        ))}
                    </div>
                </div>

                 {/* Regions */}
                 <div className="mb-2">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Region</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {REGIONS.map(r => (
                            <label key={r} className="flex items-center text-sm text-slate-600">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox h-4 w-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                                    checked={filters.regions.includes(r)}
                                    onChange={() => handleCheckboxChange('regions', r)}
                                />
                                <span className="ml-2">{r}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-3"
                        placeholder="Search datasets by title, description, or keyword..."
                        value={filters.searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Results Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-60 bg-white rounded-lg shadow-sm border border-slate-200 animate-pulse p-6">
                            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-5/6 mb-8"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            ) : datasets.length > 0 ? (
                <>
                    <p className="mb-4 text-sm text-slate-500">Showing {datasets.length} results</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {datasets.map(d => (
                            <DatasetCard key={d.id} dataset={d} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
                    <SearchIcon className="mx-auto h-12 w-12 text-slate-300" />
                    <h3 className="mt-2 text-sm font-medium text-slate-900">No datasets found</h3>
                    <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
