import React from 'react';
import { AiOutlineClose, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';

const AuthModal = ({ isOpen, onClose }) => {
  const navigateToDashboard = (role) => {
    // Navigate to the respective dashboard
    window.location.href = `/${role}-dashboard`;
    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            Choose Your Role
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors">
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Dashboard Options */}
        <div className="p-6 space-y-4">
          <button 
            className="w-full flex items-center p-4 border border-gray-200 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
            onClick={() => navigateToDashboard('buyer')}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600 mr-3">
              <AiOutlineShoppingCart size={20} />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Buyer Dashboard</p>
              <p className="text-sm text-gray-500">Access your buying tools and history</p>
            </div>
          </button>
          
          <button 
            className="w-full flex items-center p-4 border border-gray-200 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
            onClick={() => navigateToDashboard('seller')}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 mr-3">
              <AiOutlineUser size={20} />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Seller Dashboard</p>
              <p className="text-sm text-gray-500">Manage your products and sales</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;