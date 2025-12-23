import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative bg-brand-800 py-16 sm:py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About BHIRC</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-brand-100">
               Empowering global health innovation through student-led data science.
            </p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg prose-blue text-slate-500 mx-auto">
            <h2>The Story</h2>
            <p>
                The BHIRC Global Health Data Repository was founded in 2021 as a capstone project within the BioHealth Informatics Research Center at Indiana University's Luddy School of Informatics, Computing, and Engineering.
            </p>
            <p>
                What started as a small spreadsheet of local hospital statistics has grown into a comprehensive platform maintained by nearly <strong>200 students</strong>. Under the guidance of faculty leader <strong>Gary Schwebach</strong>, these students have applied skills in SQL, Python, Power BI, and web development to curate, clean, and publish over 500 datasets.
            </p>

            <h2>Our Mission</h2>
            <ul>
                <li><strong>Centralize Access:</strong> Eliminate the need to scour hundreds of disparate government websites.</li>
                <li><strong>Standardize Quality:</strong> Ensure metadata is complete and formats are usable (CSV/JSON/SQL).</li>
                <li><strong>Educate:</strong> Provide a real-world sandbox for informatics students to learn data engineering.</li>
            </ul>

            <div className="my-10 bg-slate-50 border-l-4 border-brand-500 p-6 rounded-r-lg">
                <p className="italic font-medium text-slate-700 m-0">
                    "Our goal isn't just to store data; it's to make health intelligence actionable for researchers, policymakers, and innovators around the world."
                </p>
            </div>

            <h2>Team & Contributors</h2>
            <p>
                The repository is a living project. Each semester, a new cohort of Informatics students adopts the codebase and the data pipeline, ensuring the technology stack remains modern and the data stays current.
            </p>
            <p>
               We collaborate with:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0">
                <li className="flex items-center bg-white border p-3 rounded shadow-sm">
                    <span className="font-semibold text-slate-900">Indiana Dept of Health</span>
                </li>
                 <li className="flex items-center bg-white border p-3 rounded shadow-sm">
                    <span className="font-semibold text-slate-900">Regenstrief Institute</span>
                </li>
                 <li className="flex items-center bg-white border p-3 rounded shadow-sm">
                    <span className="font-semibold text-slate-900">WHO Collaborators</span>
                </li>
                 <li className="flex items-center bg-white border p-3 rounded shadow-sm">
                    <span className="font-semibold text-slate-900">Open Data Indy</span>
                </li>
            </ul>

            <div className="mt-12 flex justify-center">
                <Link to="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700">
                    Get in Touch
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
