
import React, { useState, useEffect } from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, onClose }) => {
  const [lang, setLang] = useState<'EN' | 'YR' | 'IJ'>('EN');
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('deepseek_api_key');
    if (saved) {
        setApiKey(saved);
        setIsKeySaved(true);
    }
  }, []);

  const handleSaveKey = () => {
      if (apiKey.trim()) {
          localStorage.setItem('deepseek_api_key', apiKey.trim());
          setIsKeySaved(true);
          setShowSettings(false);
          alert("API Key Saved Securely to Browser!");
      } else {
          localStorage.removeItem('deepseek_api_key');
          setIsKeySaved(false);
      }
  };

  const navItems = [
    { id: AppView.CHAT, label: 'IṢẹ́Lẹ̀ Agent', icon: '🤖' },
    { id: AppView.PROFILE, label: 'Ondo-ID Profile', icon: '🆔' },
    { id: AppView.LOCKER, label: 'Ondo-Locker', icon: '🔐' },
    { id: AppView.FORMS, label: 'Forms Repository', icon: '📄' },
    { id: AppView.DIRECTORY, label: 'Ministry Directory', icon: '🏛️' },
    { id: AppView.PAYMENTS, label: 'Payments (IGR)', icon: '💳' },
    { id: AppView.MAPS, label: 'GIS Maps', icon: '🗺️' },
    { id: AppView.HEALTH, label: 'Telemedicine', icon: '🏥' },
    { id: AppView.COMPLAINTS, label: 'Report Issue', icon: '📢' },
    { id: AppView.DASHBOARD, label: 'Officer Dashboard', icon: '👮' },
    { id: AppView.ABOUT, label: 'About IṢẹ́Lẹ̀', icon: 'ℹ️' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`
          fixed md:relative z-30 w-64 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          {/* Logo Placeholder - Can be replaced with Image later */}
          <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center text-white font-bold shadow-sm shrink-0 border-2 border-yellow-400">
             <span className="text-2xl">☀️</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 tracking-tight text-xl leading-none">IṢẹ́Lẹ̀</h1>
            <p className="text-[11px] text-purple-700 uppercase tracking-wide font-bold italic mt-1">"Iṣẹ́ loògùn ìṣẹ́"</p>
            <p className="text-[9px] text-gray-400">Ondo State Knowledge Base</p>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChangeView(item.id);
                if (window.innerWidth < 768) onClose();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${currentView === item.id 
                  ? 'bg-purple-50 text-purple-800 border border-purple-100 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
           {/* Language Switcher */}
           <div className="flex bg-white rounded-lg p-1 border border-gray-200 mb-4 shadow-sm">
             {['EN', 'YR', 'IJ'].map((l) => (
               <button 
                 key={l}
                 onClick={() => setLang(l as any)}
                 className={`flex-1 text-[10px] font-bold py-1 rounded ${lang === l ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
               >
                 {l}
               </button>
             ))}
           </div>

           <div className="mb-3">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Pilot Deployment</h3>
            <div className="flex flex-wrap gap-1">
              {['Akure', 'Ondo Town', 'Owo', 'Ilaje'].map(city => (
                <span key={city} className="text-[10px] px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-600">
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
             <div className="flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${isKeySaved ? 'bg-green-500' : 'bg-purple-500 animate-pulse'}`}></div>
                 <p className="text-[10px] text-gray-500 font-mono">
                   DeepSeek V3.2
                 </p>
             </div>
             <button 
                onClick={() => setShowSettings(!showSettings)}
                className="text-gray-400 hover:text-purple-600"
                title="Settings"
             >
                 ⚙️
             </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
              <div className="absolute bottom-16 left-4 right-4 bg-white p-3 rounded-xl shadow-xl border border-gray-200 z-50">
                  <h4 className="text-xs font-bold text-gray-800 mb-2">API Configuration</h4>
                  <input 
                    type="password" 
                    placeholder="Enter DeepSeek API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded mb-2 focus:border-purple-500 outline-none"
                  />
                  <button 
                    onClick={handleSaveKey}
                    className="w-full bg-purple-600 text-white text-xs py-1.5 rounded font-medium hover:bg-purple-700"
                  >
                      Save Key
                  </button>
                  <p className="text-[9px] text-gray-400 mt-2 leading-tight">
                      Key is stored locally in your browser. Remove to use Simulation Mode.
                  </p>
              </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
