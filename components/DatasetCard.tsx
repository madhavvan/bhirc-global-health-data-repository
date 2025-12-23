import React from 'react';
import { Link } from 'react-router-dom';
import { Dataset } from '../types';
import { MapPin, Calendar, FileText, Download } from 'lucide-react';

interface Props {
  dataset: Dataset;
}

const DatasetCard: React.FC<Props> = ({ dataset }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 p-6 flex flex-col h-full">
      <div className="flex justify-between items-start">
        <div className="flex-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2
                ${dataset.category === 'Policies' ? 'bg-purple-100 text-purple-800' : 
                  dataset.category === 'Demographics' ? 'bg-blue-100 text-blue-800' :
                  dataset.category === 'Diseases' ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'}`}>
                {dataset.category}
            </span>
            <Link to={`/dataset/${dataset.id}`}>
                <h3 className="text-lg font-semibold text-slate-900 hover:text-brand-600 mb-2 line-clamp-2">
                    {dataset.title}
                </h3>
            </Link>
        </div>
      </div>
      
      <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">
        {dataset.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {dataset.tags.slice(0, 3).map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                #{tag}
            </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-y-2 text-xs text-slate-500">
        <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {dataset.region}
        </div>
        <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {dataset.dateUpdated}
        </div>
        <div className="flex items-center col-span-2 justify-between">
            <span className="flex items-center">
                <FileText className="h-3 w-3 mr-1" /> {dataset.format.join(', ')}
            </span>
            <span className="flex items-center text-brand-600 font-medium">
                <Download className="h-3 w-3 mr-1" /> {dataset.downloads}
            </span>
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
