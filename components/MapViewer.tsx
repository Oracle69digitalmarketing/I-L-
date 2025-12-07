
import React from 'react';

const MapViewer: React.FC = () => {
  return (
    <div className="h-full bg-gray-100 p-4 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Ondo State GIS Map (Simulation)</h2>
        <div className="flex-1 bg-gray-200 rounded-xl border border-gray-300 flex items-center justify-center relative overflow-hidden">
             <div className="text-center">
                 <div className="text-6xl mb-4">🗺️</div>
                 <p className="text-gray-500 font-medium">Interactive Map Simulation</p>
                 <p className="text-sm text-gray-400">Land Parcels • Health Centers • Schools</p>
             </div>
             {/* Mock Pins */}
             <div className="absolute top-1/3 left-1/4 text-2xl text-red-500 animate-bounce" title="Akure">📍</div>
             <div className="absolute bottom-1/3 right-1/4 text-2xl text-blue-500 animate-bounce delay-100" title="Ondo Town">📍</div>
             <div className="absolute top-1/4 right-1/3 text-2xl text-green-500 animate-bounce delay-200" title="Owo">📍</div>
             <div className="absolute bottom-1/4 left-1/3 text-2xl text-orange-500 animate-bounce delay-300" title="Ilaje">📍</div>
        </div>
    </div>
  );
};
export default MapViewer;
