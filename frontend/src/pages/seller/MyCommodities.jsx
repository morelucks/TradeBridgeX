import React, { useState } from 'react';
import { useCommoditiesByUser } from '../../hooks/getCommoditiesByUser';
import { formatEther } from 'viem';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { FiEdit, FiTrash2, FiEye, FiPackage, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const MyCommodities = () => {
   const { address } = useAccount();
  const{purchases}=useCommoditiesByUser(address)
  
  const [commodities, setCommodities] = useState([
    {
      id: 1,
      name: 'Premium Arabica Coffee',
      category: 'agriculture',
      price: 2.85,
      quantity: 1500,
      status: 'active',
      orders: 24,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Organic Wheat',
      category: 'agriculture',
      price: 320.00,
      quantity: 500,
      status: 'active',
      orders: 12,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Crude Oil (Light Sweet)',
      category: 'energy',
      price: 78.35,
      quantity: 10000,
      status: 'pending',
      orders: 0,
      rating: null
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this commodity?')) {
      setCommodities(commodities.filter(item => item.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <FiPackage className="mr-2 text-emerald-600" />
          My Commodities
        </h2>
        <Link
          to="/seller-dashboard/create-commodity"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
        >
          <FiPackage className="mr-2" />
          Add New
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
             
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {purchases.map((commodity) => (
              <tr key={commodity.commodityId
              }>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{commodity.commodityTitle}</div>
                  <div className="text-sm text-gray-500 capitalize">{commodity.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-400 mr-1" />
                    <span>{formatEther(commodity.pricePerQuantity)/0.000000000000000001}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Number(commodity.commodityQuantity)} units
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    commodity.isAvailable  ? 'bg-green-100 text-green-800' :
                    commodity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    instock
                  </span>
                </td>
               
               
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCommodities;