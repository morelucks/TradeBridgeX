import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useCommoditiesByUser } from '../../hooks/getCommoditiesByUser';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiPackage, FiDollarSign, FiActivity, FiMessageSquare, FiPlusCircle } from 'react-icons/fi';

const SellerDashboard = () => {
  const location = useLocation();
     const { address } = useAccount();
    const{purchases}=useCommoditiesByUser(address)
  const [activeTab, setActiveTab] = useState('commodities');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            <span className="text-emerald-600">Seller</span> Dashboard
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            to="/seller-dashboard"
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/seller-dashboard' ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100'}`}
          >
            <FiActivity className="mr-3" />
            Overview
          </Link>
          <Link
            to="/seller-dashboard/my-commodities"
            className={`flex items-center p-3 rounded-lg ${location.pathname.includes('my-commodities') ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100'}`}
          >
            <FiPackage className="mr-3" />
            My Commodities
          </Link>
          <Link
            to="/seller-dashboard/create-commodity"
            className={`flex items-center p-3 rounded-lg ${location.pathname.includes('create-commodity') ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100'}`}
          >
            <FiPlusCircle className="mr-3" />
            Add New Commodity
          </Link>
          <Link
            to="/seller-dashboard/disputes"
            className={`flex items-center p-3 rounded-lg ${location.pathname.includes('disputes') ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100'}`}
          >
            <FiMessageSquare className="mr-3" />
            Disputes
          </Link>

          <Link
            to="/seller-dashboard/marketplace"
            className={`flex items-center p-3 rounded-lg ${location.pathname.includes('marketplace') ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100'}`}
          >
            <FiMessageSquare className="mr-3" />
           Market place
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;