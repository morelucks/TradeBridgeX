import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PurchaseModal from "../../../modals/PurchaseModal";
import { formatEther } from "viem";
import {
  FiSearch,
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiShield,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { BsArrowUpRight, BsGraphUp } from "react-icons/bs";
import { useAccount } from "wagmi";
import { useAllCommodities } from "../../hooks/useGetAllCommodities";
import { usePurchasedCommoditiesByUser } from "../../hooks/usePurchasedCommodities";

const BuyerDashboard = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommodity, setSelectedCommodity] = React.useState(null);

  const { commodities } = useAllCommodities();

  const { purchases,salesData, isLoading, error } = usePurchasedCommoditiesByUser(address);
    console.log(salesData)
  const totalPrice = commodities?.reduce((acc, commodity) => {
    console.log(commodity)
    return acc + BigInt(commodity.pricePerQuantity);
  }, 0n); 
  
  console.log(`Total Price: ${totalPrice.toString()}`);
   

  const disputes = [
    {
      id: 201,
      commodity: "Soybeans",
      seller: "AgriCorp",
      status: "Under Review",
      date: "2023-04-20",
    },
  ];

  const handlePurchase = (commodity) => {
    setSelectedCommodity(commodity);
  };

  const filteredCommodities = commodities.filter((commodity) =>
    commodity.commodityTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Buyer Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Explore commodities and manage your purchases
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-6">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "marketplace"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            Marketplace
          </button>

          <button
            onClick={() => setActiveTab("purchases")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "purchases"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            My Purchases
          </button>

          <button
            onClick={() => setActiveTab("disputes")}
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "disputes"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            Disputes
          </button>
        </div>

        {/* Marketplace Tab */}
        {activeTab === "marketplace" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search commodities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommodities.map((commodity) => (
                <div
                  key={commodity.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {commodity.commodityTitle}
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                        {commodity.rating} ★
                      </span>
                    </div>
                    {/* <p className="text-gray-600 mb-1">
                      Seller: {commodity.seller}
                    </p> */}
                    <p className="text-gray-600 mb-3">
                      Location: {commodity.commodityLocation}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Price per unit</p>
                        <p className="text-xl font-bold text-emerald-600">
                          ${formatEther(commodity.pricePerQuantity)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Available</p>
                        <p className="text-lg font-medium">
                          {commodity.commodityQuantity.toLocaleString()} units
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePurchase(commodity)}
                        className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center"
                      >
                        <FiShoppingCart className="mr-2" />
                        Purchase
                      </button>

                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                        <BsGraphUp className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500 flex items-center">
                    <FiClock className="mr-1" />
                    <span>Delivery in {commodity.deliveryTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === "purchases" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commodity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesData.map((purchase) => (
                  <tr key={purchase.commodityId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {purchase.buyer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {purchase.seller}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {purchase.quantity}
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Disputes Tab */}
        {activeTab === "disputes" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {disputes.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commodity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seller
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {disputes.map((dispute) => (
                    <tr key={dispute.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {dispute.commodity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {dispute.seller}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {dispute.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {dispute.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/buyer-dashboard/dispute-sale/${dispute.id}`}
                          className="text-emerald-600 hover:text-emerald-800"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <FiCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No active disputes
                </h3>
                <p className="mt-1 text-gray-500">
                  All your purchases have been successfully processed.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                <FiDollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold">{formatEther(totalPrice)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FiPackage className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Purchases
                </p>
                <p className="text-2xl font-bold">{salesData?.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedCommodity && (
        <PurchaseModal
          commodity={selectedCommodity}
          onClose={() => setSelectedCommodity(null)}
        />
      )}
    </div>
  );
};

export default BuyerDashboard;
