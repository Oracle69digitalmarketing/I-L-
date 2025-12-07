
import React from 'react';

const HealthTriage: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Telemedicine Triage</h2>
        <p className="text-gray-600 mb-8">Quick assessment before visiting a hospital.</p>
        
        <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-300 cursor-pointer">
                <div className="text-4xl mb-3">🤒</div>
                <h3 className="font-bold text-gray-900">General Symptoms</h3>
                <p className="text-sm text-gray-500 mt-2">Fever, Headache, Fatigue</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-300 cursor-pointer">
                <div className="text-4xl mb-3">👶</div>
                <h3 className="font-bold text-gray-900">Maternal & Child</h3>
                <p className="text-sm text-gray-500 mt-2">Pregnancy, Immunization</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-purple-300 cursor-pointer">
                <div className="text-4xl mb-3">🚑</div>
                <h3 className="font-bold text-gray-900">Emergency</h3>
                <p className="text-sm text-gray-500 mt-2">Accidents, Critical Care</p>
            </div>
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 inline-block text-left">
            <h4 className="font-bold text-blue-900 mb-1">Nearest General Hospital:</h4>
            <p className="text-blue-800 text-sm">State Specialist Hospital, Hospital Road, Akure.</p>
        </div>
      </div>
    </div>
  );
};
export default HealthTriage;
