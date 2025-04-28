import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiMessageSquare, FiCheck, FiX } from 'react-icons/fi';

const Disputes = () => {
  const disputes = [
    {
      id: 101,
      commodity: 'Premium Arabica Coffee',
      buyer: 'CoffeeHouse Inc.',
      date: '2023-06-15',
      status: 'open',
      reason: 'Quality not as described'
    },
    {
      id: 102,
      commodity: 'Organic Wheat',
      buyer: 'Bakery Supplies LLC',
      date: '2023-06-10',
      status: 'resolved',
      reason: 'Late delivery'
    },
    {
      id: 103,
      commodity: 'Crude Oil',
      buyer: 'Energy Solutions Co.',
      date: '2023-06-05',
      status: 'closed',
      reason: 'Quantity discrepancy'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold flex items-center">
          <FiAlertTriangle className="mr-2 text-amber-500" />
          Dispute Cases
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {disputes.map((dispute) => (
              <tr key={dispute.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{dispute.commodity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dispute.buyer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dispute.date}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-xs truncate">{dispute.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    dispute.status === 'open' ? 'bg-red-100 text-red-800' :
                    dispute.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {dispute.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/seller-dashboard/disputes/${dispute.id}`}
                      className="text-emerald-600 hover:text-emerald-800 flex items-center"
                    >
                      <FiMessageSquare className="mr-1" />
                      View
                    </Link>
                    {dispute.status === 'open' && (
                      <>
                        <button className="text-green-600 hover:text-green-800 flex items-center">
                          <FiCheck className="mr-1" />
                          Resolve
                        </button>
                        <button className="text-red-600 hover:text-red-800 flex items-center">
                          <FiX className="mr-1" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Disputes;