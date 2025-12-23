import React from 'react';
import { Github, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center text-white mb-4">
              <Database className="h-6 w-6 text-brand-400" />
              <span className="ml-2 text-lg font-bold">BHIRC Data</span>
            </div>
            <p className="text-sm text-slate-400">
              A global open-source health data repository fostering research and innovation.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <Link to="/" className="text-slate-400 hover:text-white">
                <span className="sr-only">Website</span>
                <Globe className="h-6 w-6" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Repository</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/search" className="text-base text-slate-400 hover:text-white">Search Datasets</Link></li>
              <li><Link to="/resources" className="text-base text-slate-400 hover:text-white">API Docs</Link></li>
              <li><Link to="/resources" className="text-base text-slate-400 hover:text-white">Contribute Data</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Organization</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-slate-400 hover:text-white">About BHIRC</Link></li>
              <li><Link to="/about" className="text-base text-slate-400 hover:text-white">Luddy School</Link></li>
              <li><Link to="/contact" className="text-base text-slate-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-slate-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/about" className="text-base text-slate-400 hover:text-white">Terms of Use</Link></li>
              <li><Link to="/about" className="text-base text-slate-400 hover:text-white">Open Source License</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-slate-400">
            &copy; {new Date().getFullYear()} Indiana University - BioHealth Informatics Research Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;