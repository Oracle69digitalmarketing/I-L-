
import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const FormLibrary: React.FC = () => {
  const { forms } = useData();
  const [filter, setFilter] = useState('');
  const [requestSent, setRequestSent] = useState<string | null>(null);

  const filteredForms = forms.filter(form => 
    form.title.toLowerCase().includes(filter.toLowerCase()) ||
    form.ministry.toLowerCase().includes(filter.toLowerCase()) ||
    form.category.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRequest = (formId: string) => {
    setRequestSent(formId);
    setTimeout(() => setRequestSent(null), 3000);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Ministry Forms Repository</h2>
          <p className="text-gray-600 mt-2">
            Don't leave home. Download forms instantly or have them emailed to you.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
             <input
                type="text"
                placeholder="Search forms by name, ministry, or category..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
             />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {filteredForms.map((form) => (
            <div key={form.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                        {form.category}
                    </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{form.title}</h3>
                <p className="text-sm text-green-700 font-medium mb-3">{form.ministry}</p>
                <p className="text-sm text-gray-500 mb-4">{form.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                    onClick={() => handleRequest(form.id)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-green-600 shadow-sm text-sm font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 focus:outline-none"
                >
                    {requestSent === form.id ? 'Sent to Email!' : 'Email to Me'}
                </button>
                <a 
                    href={form.downloadUrl}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-700 hover:bg-green-800 focus:outline-none"
                >
                    Download
                </a>
              </div>
            </div>
          ))}

          {filteredForms.length === 0 && (
            <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No forms found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormLibrary;
