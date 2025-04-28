import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiStar, FiTrendingUp, FiBarChart2, FiDollarSign, FiShield } from 'react-icons/fi';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';

const TradePage = () => {
  const [activeTab, setActiveTab] = useState('commodities');
  const [watchlist, setWatchlist] = useState([]);
  const [commodities, setCommodities] = useState([
    { id: 1, name: 'Gold', symbol: 'XAU', price: 1950.42, change: 1.25, changePercent: 0.64, category: 'metals' },
    { id: 2, name: 'Crude Oil', symbol: 'CL', price: 78.35, change: -0.82, changePercent: -1.04, category: 'energy' },
    { id: 3, name: 'Wheat', symbol: 'ZW', price: 645.75, change: 3.25, changePercent: 0.51, category: 'agriculture' },
    { id: 4, name: 'Copper', symbol: 'HG', price: 3.82, change: 0.05, changePercent: 1.33, category: 'metals' },
    { id: 5, name: 'Coffee', symbol: 'KC', price: 1.85, change: -0.03, changePercent: -1.60, category: 'agriculture' },
    { id: 6, name: 'Natural Gas', symbol: 'NG', price: 2.68, change: 0.12, changePercent: 4.69, category: 'energy' },
  ]);

  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState(1);

  const toggleWatchlist = (id) => {
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter(item => item !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  const executeTrade = () => {
    alert(`Order executed: ${orderType} ${quantity} contracts of ${selectedCommodity.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Market Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-grow">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search commodities..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('commodities')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'commodities' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}
                  >
                    Commodities
                  </button>
                  <button
                    onClick={() => setActiveTab('watchlist')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'watchlist' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}
                  >
                    Watchlist
                  </button>
                </div>
              </div>

              {/* Commodities Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2 pl-2"></th>
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Change</th>
                      <th className="pb-2">Chart</th>
                      <th className="pb-2">Trade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commodities
                      .filter(commodity => activeTab !== 'watchlist' || watchlist.includes(commodity.id))
                      .map(commodity => (
                        <tr key={commodity.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 pl-2">
                            <button onClick={() => toggleWatchlist(commodity.id)}>
                              <FiStar className={`${watchlist.includes(commodity.id) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                            </button>
                          </td>
                          <td className="py-3">
                            <div className="font-medium">{commodity.name}</div>
                            <div className="text-sm text-gray-500">{commodity.symbol}</div>
                          </td>
                          <td className="py-3 font-medium">${commodity.price.toFixed(2)}</td>
                          <td className={`py-3 ${commodity.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            <div className="flex items-center">
                              {commodity.change >= 0 ? <BsArrowUpRight /> : <BsArrowDownRight />}
                              <span className="ml-1">
                                {Math.abs(commodity.change)} ({Math.abs(commodity.changePercent)}%)
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="h-8 w-24 bg-gradient-to-r from-emerald-100 to-emerald-300 rounded"></div>
                          </td>
                          <td className="py-3">
                            <button
                              onClick={() => setSelectedCommodity(commodity)}
                              className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
                            >
                              Trade
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FiTrendingUp className="mr-2 text-emerald-600" />
                Market Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500">Today's Volume</div>
                  <div className="text-2xl font-bold">$14.2M</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500">Active Traders</div>
                  <div className="text-2xl font-bold">8,742</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500">Top Mover</div>
                  <div className="text-2xl font-bold text-emerald-600">Natural Gas (+4.69%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-6">
            {/* Trading Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FiBarChart2 className="mr-2 text-emerald-600" />
                {selectedCommodity ? `Trade ${selectedCommodity.name}` : 'Select a Commodity'}
              </h2>

              {selectedCommodity ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500">Current Price</span>
                      <span className="font-bold">${selectedCommodity.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">24h Change</span>
                      <span className={`font-bold ${selectedCommodity.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {selectedCommodity.change >= 0 ? '+' : ''}{selectedCommodity.change} ({selectedCommodity.changePercent}%)
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex space-x-2 mb-4">
                      <button
                        onClick={() => setOrderType('market')}
                        className={`flex-1 py-2 rounded-lg ${orderType === 'market' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}
                      >
                        Market
                      </button>
                      <button
                        onClick={() => setOrderType('limit')}
                        className={`flex-1 py-2 rounded-lg ${orderType === 'limit' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}
                      >
                        Limit
                      </button>
                    </div>

                    {orderType === 'limit' && (
                      <div className="mb-4">
                        <label className="block text-gray-500 mb-1">Limit Price</label>
                        <input
                          type="number"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0.00"
                        />
                      </div>
                    )}

                    <div className="mb-6">
                      <label className="block text-gray-500 mb-1">Quantity (Contracts)</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={executeTrade}
                        className="py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                      >
                        Buy
                      </button>
                      <button
                        onClick={executeTrade}
                        className="py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Select a commodity from the list to start trading
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FiDollarSign className="mr-2 text-emerald-600" />
                Your Portfolio
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Balance</span>
                  <span className="font-bold">$12,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Open Positions</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Today's P&L</span>
                  <span className="font-bold text-emerald-600">+$245.50</span>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FiShield className="mr-2 text-emerald-600" />
                Secure Trading
              </h2>
              <p className="text-gray-600 mb-4">
                All trades are executed on-chain with smart contract verification for maximum security.
              </p>
              <button className="w-full py-2 bg-gray-100 rounded-lg text-emerald-600 font-medium">
                View Transaction History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePage;