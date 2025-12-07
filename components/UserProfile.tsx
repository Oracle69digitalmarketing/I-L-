
import React from 'react';
import { useData } from '../context/DataContext';

const UserProfile: React.FC = () => {
  const { user } = useData();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-purple-700 p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg">
                👤
            </div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-purple-200">{user.lga} • Ondo State Citizen</p>
        </div>

        {/* Content */}
        <div className="p-8">
            <div className="mb-8 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Unified Ondo-ID</p>
                <div className="inline-block bg-gray-100 px-6 py-2 rounded-lg font-mono text-xl font-bold tracking-widest text-gray-800 border border-gray-200">
                    {user.ondoId}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600">Phone Number</span>
                            <span className="font-medium text-gray-900">{user.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Preferred Language</span>
                            <span className="font-medium text-gray-900">{user.languagePreference}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Integrations</h3>
                     {/* India WhatsApp-First Strategy */}
                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                                📞
                            </div>
                            <div>
                                <h4 className="font-bold text-green-900">WhatsApp Connected</h4>
                                <p className="text-xs text-green-700">Receive notifications on WhatsApp</p>
                            </div>
                        </div>
                        <button className="text-sm font-medium text-green-700 hover:text-green-800">
                            Configure
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
                <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg">
                    Edit Profile
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
