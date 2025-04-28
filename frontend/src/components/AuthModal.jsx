import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AuthModal = ({ isOpen, onClose, onConnectWallet }) => {
  const [activeTab, setActiveTab] = useState('buyer');
  const [username, setUsername] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Here you would call your wallet connection logic
      await onConnectWallet(activeTab, username);
      onClose();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            Connect to CommX
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'buyer' 
                ? 'text-emerald-600 border-b-2 border-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            <AiOutlineShoppingCart />
            <span>Buyer</span>
          </button>
          <button
            className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'seller' 
                ? 'text-amber-600 border-b-2 border-amber-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('seller')}
          >
            <AiOutlineUser />
            <span>Seller</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Connect your wallet
            </h4>
            <div className="space-y-3">
              {/* Wallet options would go here */}
              <button 
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeTab === 'buyer' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {activeTab === 'buyer' ? <AiOutlineShoppingCart size={20} /> : <AiOutlineUser size={20} />}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">
                      {activeTab === 'buyer' ? 'Buyer Wallet' : 'Seller Wallet'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Connect as {activeTab}
                    </p>
                  </div>
                </div>
                <FiExternalLink className="text-gray-400" />
              </button>
            </div>
          </div>

          <button
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              activeTab === 'buyer' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-amber-600 hover:bg-amber-700'
            } flex items-center justify-center`}
            onClick={handleConnect}
            disabled={isConnecting || !username}
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : (
              `Connect as ${activeTab}`
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;