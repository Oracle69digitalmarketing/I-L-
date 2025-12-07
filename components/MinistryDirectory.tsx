
import React from 'react';
import { useData } from '../context/DataContext';

const MinistryDirectory: React.FC = () => {
  const { ministries } = useData();
  const ministryKeys = Object.keys(ministries);

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Government Directory</h2>
          <p className="text-gray-600 mt-2">
            Direct access to Ministry profiles, responsibilities, and leadership. 
            The <strong>Knowledge Base</strong> powering IṢẹ́Lẹ̀.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministryKeys.map((key) => {
            const m = ministries[key];
            return (
              <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-purple-700 w-full"></div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-2xl mb-4">
                    🏛️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{m.full_name}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex items-start gap-1">
                    <span className="mt-0.5">📍</span> {m.address}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Key Responsibilities</h4>
                    <ul className="space-y-1">
                      {m.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100">
                      View Profile
                    </button>
                    <button className="px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MinistryDirectory;
