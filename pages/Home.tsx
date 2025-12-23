import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Database, ArrowRight } from 'lucide-react';
import DatasetCard from '../components/DatasetCard';
import { getFeaturedDatasets } from '../services/datasetService';
import { Dataset } from '../types';

const Home: React.FC = () => {
  const [featured, setFeatured] = useState<Dataset[]>([]);

  useEffect(() => {
    getFeaturedDatasets().then(setFeatured);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brand-700 overflow-hidden">
        <div className="absolute inset-0">
           <svg className="h-full w-full" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.1" />
              <defs>
                <radialGradient id="gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                  <stop stopColor="#ffffff" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>
           </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              BHIRC Global Health <br/><span className="text-brand-200">Data Repository</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-brand-100">
              A centralized, open-source platform connecting researchers to high-quality health datasets from 38 U.S. states and 89 international sources.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link to="/search" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-700 bg-white hover:bg-brand-50 md:py-4 md:text-lg shadow-sm">
                  <Search className="w-5 h-5 mr-2" />
                  Search Datasets
                </Link>
                <Link to="/search" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg">
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 text-center">
                <div className="bg-slate-50 overflow-hidden shadow-sm rounded-lg p-6">
                    <dt className="text-sm font-medium text-slate-500 truncate uppercase tracking-wider">Total Datasets</dt>
                    <dd className="mt-1 text-3xl font-semibold text-slate-900">500+</dd>
                </div>
                <div className="bg-slate-50 overflow-hidden shadow-sm rounded-lg p-6">
                    <dt className="text-sm font-medium text-slate-500 truncate uppercase tracking-wider">International Sources</dt>
                    <dd className="mt-1 text-3xl font-semibold text-slate-900">89 Countries</dd>
                </div>
                <div className="bg-slate-50 overflow-hidden shadow-sm rounded-lg p-6">
                    <dt className="text-sm font-medium text-slate-500 truncate uppercase tracking-wider">Contributors</dt>
                    <dd className="mt-1 text-3xl font-semibold text-slate-900">200+ Students</dd>
                </div>
            </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="flex-1 bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Featured Datasets</h2>
                <Link to="/search" className="text-brand-600 hover:text-brand-700 font-medium flex items-center">
                    View All <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.length > 0 ? (
                    featured.map(d => <DatasetCard key={d.id} dataset={d} />)
                ) : (
                    // Skeleton Loading
                    [1,2,3,4].map(i => (
                        <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-lg"></div>
                    ))
                )}
            </div>
        </div>
      </div>

      {/* Mission/Info Strip */}
      <div className="bg-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Our Mission</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Democratizing Health Intelligence
                </p>
                <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                    Built by students at Indiana University, we aim to provide accessible, clean, and reliable health data to support the next generation of healthcare innovations and policy decisions.
                </p>
            </div>

            <div className="mt-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                            <Globe className="h-6 w-6" />
                        </div>
                        <h3 className="mt-5 text-lg leading-6 font-medium text-slate-900">Global Coverage</h3>
                        <p className="mt-2 text-base text-slate-500">From local Indiana hospital capacities to international WHO statistics, access data from every corner of the globe.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                         <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                            <Database className="h-6 w-6" />
                        </div>
                        <h3 className="mt-5 text-lg leading-6 font-medium text-slate-900">Standardized Formats</h3>
                        <p className="mt-2 text-base text-slate-500">Datasets are cleaned and provided in researcher-friendly formats (CSV, JSON, GeoJSON) ready for analysis.</p>
                    </div>
                     <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                            <Search className="h-6 w-6" />
                        </div>
                        <h3 className="mt-5 text-lg leading-6 font-medium text-slate-900">Deep Discovery</h3>
                        <p className="mt-2 text-base text-slate-500">Advanced filtering and AI-assisted search tools help you find the exact slice of data you need quickly.</p>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;
