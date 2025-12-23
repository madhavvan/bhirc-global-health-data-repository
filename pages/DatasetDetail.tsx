import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDatasetById, getRelatedDatasets, triggerDownload } from '../services/datasetService';
import { generateResearchIdeas } from '../services/grokService';
import { Dataset } from '../types';
import { Download, Calendar, MapPin, Database, Tag, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import DataVisualizer from '../components/DataVisualizer';
import DatasetCard from '../components/DatasetCard';

const DatasetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dataset, setDataset] = useState<Dataset | undefined>();
  const [related, setRelated] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  
  // AI State
  const [aiIdeas, setAiIdeas] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setAiIdeas(""); // Reset AI state on new id
      getDatasetById(id).then(data => {
        setDataset(data);
        if (data) {
            getRelatedDatasets(data.id, data.category).then(setRelated);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleGenerateIdeas = async () => {
    if (!dataset) return;
    setLoadingAi(true);
    const ideas = await generateResearchIdeas(dataset);
    setAiIdeas(ideas);
    setLoadingAi(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading dataset...</div>;
  if (!dataset) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Dataset not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/search" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-600 mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <span className="text-brand-600 font-semibold text-sm tracking-wide uppercase">{dataset.category}</span>
                    <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl sm:tracking-tight">{dataset.title}</h1>
                    <div className="mt-2 flex flex-wrap items-center text-sm text-slate-500 space-x-6">
                        <span className="flex items-center"><Database className="mr-1.5 h-4 w-4 flex-shrink-0 text-slate-400" /> {dataset.source}</span>
                        <span className="flex items-center"><MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-slate-400" /> {dataset.region}</span>
                        <span className="flex items-center"><Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-slate-400" /> Updated {dataset.dateUpdated}</span>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                     <a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(dataset.title + ' ' + dataset.source)}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
                    >
                        <ExternalLink className="-ml-1 mr-2 h-5 w-5 text-slate-400" />
                        Original Source
                    </a>
                    <button 
                        onClick={() => triggerDownload(dataset)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    >
                        <Download className="-ml-1 mr-2 h-5 w-5" />
                        Download {dataset.format[0]} ({dataset.size})
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-slate-900 mb-4">Description</h2>
                <div className="prose prose-blue text-slate-500 max-w-none">
                    <p>{dataset.description}</p>
                    <p className="mt-2">
                        This dataset is provided under an Open Data license. It is suitable for academic research, 
                        public health analysis, and policy development.
                    </p>
                </div>
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-slate-900">Tags</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {dataset.tags.map(tag => (
                             <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                <Tag className="w-3 h-3 mr-1 text-slate-500"/> {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Data Preview / Visualization */}
            {dataset.sampleData && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Data Preview</h2>
                    <DataVisualizer data={dataset.sampleData} title="Sample Metric Distribution" />
                    <p className="mt-4 text-xs text-slate-400 text-center">
                        * Chart represents a sample subset of the full data. Download full dataset for complete analysis.
                    </p>
                </div>
            )}

            {/* AI Researcher Assistant - GROK */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 shadow-lg rounded-lg p-6 text-white">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-slate-700 rounded-lg">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-3">
                        <h2 className="text-lg font-medium text-white">AI Research Assistant</h2>
                        <p className="text-sm text-slate-400">Powered by Grok</p>
                    </div>
                </div>
                
                {!aiIdeas ? (
                     <div className="text-center py-6">
                        <p className="text-slate-300 mb-4">Not sure where to start? Ask Grok to suggest potential research hypotheses based on this dataset.</p>
                        <button 
                            onClick={handleGenerateIdeas}
                            disabled={loadingAi}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-slate-900 bg-white hover:bg-slate-100 disabled:opacity-50 transition-colors"
                        >
                            {loadingAi ? 'Grokking...' : 'Generate Research Ideas'}
                        </button>
                     </div>
                ) : (
                    <div className="prose prose-invert text-slate-300 text-sm bg-slate-800/50 p-4 rounded border border-slate-600">
                        {aiIdeas.split('\n').map((line, i) => (
                             <p key={i} className={line.startsWith('**') ? 'font-bold mt-2 text-white' : ''}>
                                {line.replace(/\*\*/g, '')}
                             </p>
                        ))}
                         <button 
                            onClick={() => setAiIdeas("")}
                            className="mt-4 text-xs text-slate-400 hover:text-white underline"
                        >
                            Clear and try again
                        </button>
                    </div>
                )}
            </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-sm font-medium text-slate-900 mb-4">Metadata</h3>
                <dl className="space-y-3">
                    <div className="flex justify-between">
                        <dt className="text-sm text-slate-500">Format</dt>
                        <dd className="text-sm font-medium text-slate-900 flex gap-1">
                             {dataset.format.map(f => <span key={f} className="uppercase bg-slate-100 px-1 rounded">{f}</span>)}
                        </dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm text-slate-500">Size</dt>
                        <dd className="text-sm font-medium text-slate-900">{dataset.size}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm text-slate-500">License</dt>
                        <dd className="text-sm font-medium text-slate-900">CC BY 4.0</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm text-slate-500">Source Type</dt>
                        <dd className="text-sm font-medium text-slate-900">{dataset.sourceType}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm text-slate-500">Downloads</dt>
                        <dd className="text-sm font-medium text-slate-900">{dataset.downloads}</dd>
                    </div>
                </dl>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-sm font-medium text-slate-900 mb-4">Citation</h3>
                <div className="bg-slate-50 p-3 rounded text-xs text-slate-600 font-mono break-all border border-slate-200">
                    BHIRC. (2024). {dataset.title} [Data set]. Global Health Data Repository. https://bhirc-data.iu.edu/dataset/{dataset.id}
                </div>
            </div>
        </div>
      </div>

      {/* Related Datasets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Related Datasets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(d => (
                <DatasetCard key={d.id} dataset={d} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail;