
import React from 'react';
import { useData } from '../context/DataContext';

const GrievanceRedressal: React.FC = () => {
  const { reports } = useData();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Report an Issue</h2>
        <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold mb-4">Log a Complaint</h3>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-sm" placeholder="Describe the issue..." rows={4}></textarea>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-sm" placeholder="Location (e.g. Akure)" />
                <button className="w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">Submit Report</button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-semibold mb-4">My Reports</h3>
                {reports.map(r => (
                    <div key={r.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex justify-between mb-1">
                            <span className="font-medium text-gray-900">{r.issue}</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">{r.status}</span>
                        </div>
                        <p className="text-xs text-gray-500">{r.location} • {r.date}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
export default GrievanceRedressal;
