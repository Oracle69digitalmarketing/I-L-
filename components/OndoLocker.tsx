
import React from 'react';
import { useData } from '../context/DataContext';

const OndoLocker: React.FC = () => {
  const { lockerDocs, user } = useData();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">🔐</span> Ondo-Locker
            </h2>
            <p className="text-gray-600 mt-2">
              Secure Digital Document Repository for <strong>{user.name}</strong> ({user.ondoId})
            </p>
          </div>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 shadow-sm">
            + Upload New
          </button>
        </div>

        <div className="grid gap-4">
          {lockerDocs.map((doc) => (
            <div key={doc.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                 <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center text-2xl
                    ${doc.type === 'Certificate' ? 'bg-blue-100' : 
                      doc.type === 'Land Title' ? 'bg-orange-100' :
                      doc.type === 'Tax' ? 'bg-green-100' : 'bg-gray-100'}
                 `}>
                    {doc.type === 'Certificate' ? '🎓' : 
                     doc.type === 'Land Title' ? '🏠' :
                     doc.type === 'Tax' ? '💰' : '📄'}
                 </div>
                 <div>
                    <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-500">Issued by: {doc.issuingAuthority}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">Date: {doc.issueDate}</span>
                        {doc.status === 'Verified' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Verified ✔
                            </span>
                        )}
                        {doc.status === 'Pending' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending Verification
                            </span>
                        )}
                    </div>
                 </div>
              </div>

              <div className="flex gap-2">
                 <button className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View
                 </button>
                 <button className="flex-1 md:flex-none px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
                    Download
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
           <span className="text-2xl">ℹ️</span>
           <div>
              <h4 className="font-semibold text-blue-900">Did you know?</h4>
              <p className="text-sm text-blue-800">
                 The <strong>IṢẹ́Lẹ̀ Agent</strong> can automatically access these documents when you apply for services. 
                 Just say "Use my C of O from my Ondo-Locker".
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OndoLocker;
