
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import FormLibrary from './components/FormLibrary';
import OfficerDashboard from './components/OfficerDashboard';
import MinistryDirectory from './components/MinistryDirectory';
import UserProfile from './components/UserProfile';
import OndoLocker from './components/OndoLocker';
import PaymentPortal from './components/PaymentPortal';
import GrievanceRedressal from './components/GrievanceRedressal';
import HealthTriage from './components/HealthTriage';
import MapViewer from './components/MapViewer';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CHAT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.CHAT:
        return <ChatInterface />;
      case AppView.FORMS:
        return <FormLibrary />;
      case AppView.DASHBOARD:
        return <OfficerDashboard />;
      case AppView.DIRECTORY:
        return <MinistryDirectory />;
      case AppView.PROFILE:
        return <UserProfile />;
      case AppView.LOCKER:
        return <OndoLocker />;
      case AppView.PAYMENTS:
        return <PaymentPortal />;
      case AppView.COMPLAINTS:
        return <GrievanceRedressal />;
      case AppView.HEALTH:
        return <HealthTriage />;
      case AppView.MAPS:
        return <MapViewer />;
      case AppView.ABOUT:
        return (
          <div className="p-8 max-w-2xl mx-auto text-gray-700 h-full overflow-y-auto">
             <h2 className="text-3xl font-bold mb-4 text-purple-800">About IṢẹ́Lẹ̀</h2>
             <p className="mb-4 leading-relaxed">
               IṢẹ́Lẹ̀ is Ondo State's advanced Hybrid AI Governance platform, inspired by the scalability of Digital India and the precision of Singapore's Smart Nation.
             </p>
             <h3 className="text-xl font-semibold mb-2">Hybrid Architecture</h3>
             <ul className="list-disc pl-5 mb-6 space-y-2">
                <li><strong>Ondo-ID (India):</strong> Unified Single Sign-On for citizens.</li>
                <li><strong>Ondo-Locker (India):</strong> Secure digital document repository.</li>
                <li><strong>Proactive Service (Singapore):</strong> Agent anticipates needs (e.g., offering market prices).</li>
                <li><strong>Market Intelligence (Ondo Plus):</strong> Real-time commodity pricing for farmers.</li>
             </ul>
             <h3 className="text-xl font-semibold mb-2">Technical Specifications</h3>
             <ul className="list-disc pl-5 mb-6 space-y-2">
                <li><strong>AI Engine:</strong> DeepSeek V3.2 (Optimized for Legal & Procedural Logic)</li>
                <li><strong>Latency:</strong> Low-latency inference for rural connectivity</li>
             </ul>
             <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mt-4">
                <p className="text-sm font-mono text-gray-600">System Status: Online</p>
                <p className="text-sm font-mono text-gray-600">Model: DeepSeek-V3 (Chat)</p>
             </div>
          </div>
        );
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center text-white font-bold">
               IṢ
             </div>
             <span className="font-bold text-gray-800">IṢẹ́Lẹ̀</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </header>

        {renderView()}
      </main>
    </div>
  );
};

export default App;
