
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { District } from '../types';

const OfficerDashboard: React.FC = () => {
  const { verifications, appointments } = useData();
  const [activeTab, setActiveTab] = useState<'pending' | 'in_progress' | 'completed'>('pending');
  const [selectedDistrict, setSelectedDistrict] = useState<District>('Akure');

  // Filter first by District (The Four Pillars), then by Status
  const filteredData = verifications.filter(item => 
    item.status === activeTab && 
    (selectedDistrict === 'General' ? true : item.district === selectedDistrict)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">⏳ Pending</span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">🔍 In Progress</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">✅ Completed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getDistrictColor = (district: District) => {
      switch(district) {
          case 'Akure': return 'bg-purple-600'; // Capital/Admin
          case 'Ondo Town': return 'bg-red-600'; // Culture/Education
          case 'Owo': return 'bg-orange-500'; // Agric
          case 'Ilaje': return 'bg-blue-600'; // Coastal
          default: return 'bg-gray-600';
      }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Officer Dashboard</h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getDistrictColor(selectedDistrict)}`}></span>
                    {selectedDistrict === 'General' ? 'Statewide Overview' : `${selectedDistrict} District Office`}
                </p>
            </div>
            
            {/* Appointment / Verification Stats */}
            <div className="flex gap-2">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 text-center px-4">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Scheduled</div>
                    <div className="text-xl font-bold text-purple-600">{appointments.length}</div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 text-center px-4">
                    <div className="text-xs text-gray-500 uppercase font-semibold">Queue</div>
                    <div className="text-xl font-bold text-green-600">{verifications.filter(i => i.status === 'pending').length}</div>
                </div>
            </div>
        </div>

        {/* District Switcher (The Four Pillars) */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 flex overflow-x-auto">
            {(['Akure', 'Ondo Town', 'Owo', 'Ilaje'] as District[]).map((district) => (
                <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`
                        flex-1 min-w-[100px] py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                        ${selectedDistrict === district 
                            ? `${getDistrictColor(district)} text-white shadow-md` 
                            : 'text-gray-600 hover:bg-gray-50'}
                    `}
                >
                    {district}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Table Area */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            {['pending', 'in_progress', 'completed'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`
                                        w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm capitalize
                                        ${activeTab === tab 
                                            ? 'border-green-500 text-green-600' 
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                    `}
                                >
                                    {tab.replace('_', ' ')}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen / Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">{item.type}</span>
                                            <div className="text-xs text-gray-500">{item.ministry}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.citizenId}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.details}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {getStatusBadge(item.status)}
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-sm text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="text-2xl mb-2">📂</span>
                                                <p>No {activeTab.replace('_', ' ')} requests in {selectedDistrict}.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
                
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        📅 Upcoming Appointments
                    </h3>
                    <div className="space-y-4">
                        {appointments.length === 0 ? (
                            <p className="text-sm text-gray-500">No appointments scheduled.</p>
                        ) : (
                            appointments.slice(0, 3).map(apt => (
                                <div key={apt.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="bg-purple-100 text-purple-600 text-xs font-bold px-2 py-1 rounded">
                                        {apt.date.split('-')[1]?.trim() || 'Today'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{apt.citizenName}</p>
                                        <p className="text-xs text-gray-500">{apt.reason}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                            Create New Verification
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Download District Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
