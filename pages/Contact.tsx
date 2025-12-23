import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic to send email would go here
  };

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-slate-500">
            Have questions about a dataset or want to partner with BHIRC?
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
            
            {/* Contact Info */}
            <div className="bg-slate-50 rounded-lg p-8 shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-6">Get in touch directly</h3>
                <dl className="space-y-6">
                    <div className="flex">
                        <dt className="flex-shrink-0">
                            <MapPin className="h-6 w-6 text-brand-600" />
                        </dt>
                        <dd className="ml-3 text-base text-slate-500">
                            <p>Luddy School of Informatics, Computing, and Engineering</p>
                            <p>535 W Michigan St</p>
                            <p>Indianapolis, IN 46202</p>
                        </dd>
                    </div>
                    <div className="flex">
                        <dt className="flex-shrink-0">
                            <Phone className="h-6 w-6 text-brand-600" />
                        </dt>
                        <dd className="ml-3 text-base text-slate-500">
                            +1 (317) 278-0000
                        </dd>
                    </div>
                    <div className="flex">
                        <dt className="flex-shrink-0">
                            <Mail className="h-6 w-6 text-brand-600" />
                        </dt>
                        <dd className="ml-3 text-base text-slate-500">
                            bhirc-support@iu.edu
                        </dd>
                    </div>
                </dl>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg p-8 shadow-lg border border-slate-100">
                {submitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                         <div className="rounded-full bg-green-100 p-3 mb-4">
                             <Mail className="h-8 w-8 text-green-600" />
                         </div>
                         <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                         <p className="text-slate-500 mt-2">Thank you for contacting us. We will get back to you shortly.</p>
                         <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-600 hover:text-brand-500 font-medium">Send another message</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border border-slate-300 rounded-md"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
