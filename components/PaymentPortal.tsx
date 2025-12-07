
import React from 'react';
import { useData } from '../context/DataContext';

const PaymentPortal: React.FC = () => {
  const { payments } = useData();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Portal (IGR)</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <div className="flex gap-4 mb-6">
                 <button className="flex-1 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors flex flex-col items-center justify-center gap-2">
                     <span className="text-3xl">💳</span>
                     <span className="font-semibold text-gray-700">Make New Payment</span>
                 </button>
                 <button className="flex-1 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors flex flex-col items-center justify-center gap-2">
                     <span className="text-3xl">🧾</span>
                     <span className="font-semibold text-gray-700">Verify Receipt</span>
                 </button>
             </div>
             
             <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
             <table className="w-full text-left">
                 <thead>
                     <tr className="border-b border-gray-100">
                         <th className="pb-3 text-sm font-medium text-gray-500">Service</th>
                         <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                         <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                         <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                     </tr>
                 </thead>
                 <tbody>
                     {payments.map(p => (
                         <tr key={p.id} className="border-b border-gray-50 last:border-0">
                             <td className="py-3 text-gray-900">{p.service}</td>
                             <td className="py-3 font-mono text-gray-600">{p.amount}</td>
                             <td className="py-3 text-sm text-gray-500">{p.date}</td>
                             <td className="py-3">
                                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                                     {p.status}
                                 </span>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
      </div>
    </div>
  );
};
export default PaymentPortal;
