import React from "react";
import { Link } from "react-router-dom";
import { useCommoditiesByUser } from "../../hooks/getCommoditiesByUser";
import { formatEther } from "viem";

import { useAccount } from "wagmi";
import {
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";

const SellerOverview = () => {
  const { address } = useAccount();
  const { purchases } = useCommoditiesByUser(address);
  const totalPrice = purchases.reduce((acc, commodity) => {
   
    return acc + BigInt(commodity.pricePerQuantity);
  }, 0n); 
  
  console.log(`Total Price: ${totalPrice.toString()}`);

  
  const stats = [
    {
      title: "Active Listings",
      value: purchases?.length,
      icon: <FiPackage className="text-emerald-500" />,
      change: "+3 this week",
    },
    {
      title: "Total Revenue",
      value: formatEther(totalPrice),
      icon: <FiDollarSign className="text-blue-500" />,
      change: "12% increase",
    },
    {
      title: "Open Disputes",
      value: 2,
      icon: <FiAlertTriangle className="text-red-500" />,
      change: "1 new",
    },
  ];



  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold">Welcome back, Coffee Producer</h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your commodities today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="text-2xl p-2 rounded-full bg-gray-50">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            <FiClock className="mr-2 text-blue-500" />
            Recent Activity
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commodity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount/Status
                </th>
             
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchases.map((activity) => (
                <tr key={activity.commodityId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        activity.type === "Sale"
                          ? "bg-green-100 text-green-800"
                          : activity.type === "Listing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {activity.commodityTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.buyer || "-"}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatEther(activity.pricePerQuantity) || (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          activity.status === "Open"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    )}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/seller-dashboard/create-commodity"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-4 rounded-lg text-center transition-colors"
          >
            <div className="flex flex-col items-center">
              <FiPackage className="text-xl mb-2" />
              <span>List New Commodity</span>
            </div>
          </Link>
          <Link
            to="/seller-dashboard/my-commodities"
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg text-center transition-colors"
          >
            <div className="flex flex-col items-center">
              <FiPackage className="text-xl mb-2" />
              <span>Manage Listings</span>
            </div>
          </Link>
          <Link
            to="/seller-dashboard/disputes"
            className="bg-amber-50 hover:bg-amber-100 text-amber-700 p-4 rounded-lg text-center transition-colors"
          >
            <div className="flex flex-col items-center">
              <FiAlertTriangle className="text-xl mb-2" />
              <span>View Disputes</span>
            </div>
          </Link>
          <Link
            to="/trade"
            className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg text-center transition-colors"
          >
            <div className="flex flex-col items-center">
              <FiTrendingUp className="text-xl mb-2" />
              <span>Marketplace</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
