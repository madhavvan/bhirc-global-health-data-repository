import React from 'react';
import { BookOpen, Code, FileText, Send } from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Resources for Researchers</h1>
            <p className="mt-4 text-lg text-slate-500">Guides, tools, and documentation to help you get the most out of our data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Guide Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-brand-100 rounded-md p-3">
                            <BookOpen className="h-6 w-6 text-brand-600" />
                        </div>
                        <div className="ml-5">
                            <h3 className="text-lg leading-6 font-medium text-slate-900">Data Usage Guide</h3>
                            <p className="mt-2 text-base text-slate-500">
                                Learn how to interpret our metadata schema, understand regional coding standards, and handle missing values in longitudinal studies.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <a href="#" className="text-brand-600 font-medium hover:text-brand-500">Read Guide &rarr;</a>
                    </div>
                </div>
            </div>

            {/* API Docs Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                            <Code className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-5">
                            <h3 className="text-lg leading-6 font-medium text-slate-900">API Documentation</h3>
                            <p className="mt-2 text-base text-slate-500">
                                Automate your research with our REST API. Access endpoints for search, metadata retrieval, and bulk downloads.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <a href="#" className="text-purple-600 font-medium hover:text-purple-500">View API Docs &rarr;</a>
                    </div>
                </div>
            </div>

             {/* Citation Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                            <FileText className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-5">
                            <h3 className="text-lg leading-6 font-medium text-slate-900">Citation Guidelines</h3>
                            <p className="mt-2 text-base text-slate-500">
                                Proper attribution ensures the sustainability of open data. Find standard APA, MLA, and Chicago citation formats here.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <a href="#" className="text-yellow-600 font-medium hover:text-yellow-500">Citation Tools &rarr;</a>
                    </div>
                </div>
            </div>

             {/* Contribute Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                            <Send className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-5">
                            <h3 className="text-lg leading-6 font-medium text-slate-900">Suggest a Dataset</h3>
                            <p className="mt-2 text-base text-slate-500">
                                Know of a public health dataset we missed? Submit a suggestion to our student curation team.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <a href="#" className="text-green-600 font-medium hover:text-green-500">Submit Suggestion &rarr;</a>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Resources;
