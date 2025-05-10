import React, { useState } from "react";
import { Link } from "react-router-dom";
import PurchaseModal from "../../../modals/PurchaseModal";
import { formatEther } from "viem";
import {
  FiSearch,
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiMapPin,
  FiImage,
} from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { useAccount } from "wagmi";
import { useAllCommodities } from "../../hooks/useGetAllCommodities";
import { usePurchasedCommoditiesByUser } from "../../hooks/usePurchasedCommodities";

const BuyerDashboard = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommodity, setSelectedCommodity] = React.useState(null);

  const { commodities, isLoading: commoditiesLoading } = useAllCommodities();
  const { purchases, salesData, isLoading: purchasesLoading, error } = usePurchasedCommoditiesByUser(address);
  
  const totalPrice = commodities?.reduce((acc, commodity) => {
    return acc + BigInt(commodity.pricePerQuantity);
  }, 0n);

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

 
  const getCommodityImage = (commodity) => {
    
    if (commodity.imageURL && commodity.imageURL.includes('pinata') && !commodity.imageURL.includes('placeholder')) {
      return commodity.imageURL; 
    }
    
   
    if (commodity.imageURL && commodity.imageURL.startsWith('http') && !commodity.imageURL.includes('example.com')) {
      return commodity.imageURL;
    }
    
   
    return 'https://via.placeholder.com/300x200?text=Commodity';
  };

  // Render commodity card function
  const renderCommodityCard = (commodity) => {
    const imageUrl = getCommodityImage(commodity);
    
    return (
      <div 
        key={commodity.commodityId.toString()} 
        className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
      >
        <div className="relative h-48 bg-gray-100">
          {/* Image with error handling */}
          <img 
            src={imageUrl}
            alt={commodity.commodityTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite error loop
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          
          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm flex items-center">
            <FiDollarSign className="text-emerald-600 mr-1" />
            <span className="font-medium">{formatEther(commodity.pricePerQuantity)} ETH</span>
          </div>
          
          {/* Location badge */}
          <div className="absolute bottom-3 left-3 bg-white/80 px-2 py-1 rounded-lg text-xs flex items-center">
            <FiMapPin className="text-gray-600 mr-1" />
            <span>{commodity.commodityLocation || 'Unknown location'}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{commodity.commodityTitle}</h3>
          
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <FiPackage className="mr-1" />
            <span>
              {commodity.commodityQuantity.toString()} {commodity.quantityMeasurement} available
            </span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {commodity.commodityDescription.split('\n')[0]}
          </p>
          
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePurchase(commodity)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center text-sm"
            >
              <FiShoppingCart className="mr-2" />
              Purchase
            </button>
            
            <Link
              to={`/marketplace/${commodity.commodityId.toString()}`}
              className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Buyer Dashboard</h1>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search commodities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {/* Filter/Sort Options can be added here */}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`py-3 px-1 border-b-2 ${
              activeTab === "marketplace"
                ? "border-emerald-500 text-emerald-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab("purchases")}
            className={`py-3 px-1 border-b-2 ${
              activeTab === "purchases"
                ? "border-emerald-500 text-emerald-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            My Purchases
          </button>
          <button
            onClick={() => setActiveTab("disputes")}
            className={`py-3 px-1 border-b-2 ${
              activeTab === "disputes"
                ? "border-emerald-500 text-emerald-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Disputes
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "marketplace" && (
        <div>
          {commoditiesLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : filteredCommodities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCommodities.map(renderCommodityCard)}
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No commodities found</h3>
              <p className="mt-1 text-gray-500">
                There are no commodities matching your search criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "purchases" && (
        <div>
          {purchasesLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : purchases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">
                      {purchase.commodityTitle}
                    </h3>
                    
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <FiDollarSign className="mr-1" />
                      <span>{formatEther(purchase.totalPrice)} ETH</span>
                    </div>
                    
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <FiPackage className="mr-1" />
                      <span>
                        {purchase.quantity} {purchase.quantityMeasurement}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <FiClock className="mr-1" />
                      <span>
                        {new Date(Number(purchase.timestamp) * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          purchase.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {purchase.completed ? "Completed" : "In Progress"}

                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link
                        to={`/purchase/${purchase.id}`}
                        className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No purchases yet</h3>
              <p className="mt-1 text-gray-500">
                You haven't made any purchases yet. Browse the marketplace to get started!
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "disputes" && (
        <div>
          {disputes.length > 0 ? (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commodity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seller
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disputes.map((dispute) => (
                    <tr key={dispute.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{dispute.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dispute.commodity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dispute.seller}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {dispute.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dispute.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/dispute/${dispute.id}`}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <FiCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No disputes</h3>
              <p className="mt-1 text-gray-500">
                You don't have any active disputes.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Purchase Modal */}
      {selectedCommodity && (
        <PurchaseModal
          isOpen={!!selectedCommodity}
          onClose={() => setSelectedCommodity(null)}
          commodity={selectedCommodity}
        />
      )}
    </div>
  );
};

export default BuyerDashboard;