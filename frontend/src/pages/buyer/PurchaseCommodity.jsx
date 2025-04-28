import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDollarSign, FiPackage, FiCalendar, FiTruck, FiShield } from 'react-icons/fi';
import { FaRegHandshake } from 'react-icons/fa';

const PurchaseCommodity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('escrow');
  const [deliveryOption, setDeliveryOption] = useState('standard');

  // Fetch commodity details based on ID (mock data for example)
  const [commodity, setCommodity] = useState(null);
  
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const mockCommodities = {
      1: { id: 1, name: 'Premium Wheat', seller: 'FarmCo', price: 645.75, location: 'Kansas, USA', rating: 4.8, minOrder: 100, totalAvailable: 5000 },
      2: { id: 2, name: 'Arabica Coffee', seller: 'BeanGrowers', price: 1.85, location: 'Colombia', rating: 4.6, minOrder: 50, totalAvailable: 2000 },
      3: { id: 3, name: 'Crude Oil', seller: 'PetroGlobal', price: 78.35, location: 'Texas, USA', rating: 4.9, minOrder: 10, totalAvailable: 10000 },
    };
    
    setCommodity(mockCommodities[id] || null);
  }, [id]);

  const handlePurchase = () => {
    // In a real app, this would call your purchase API
    alert(`Purchase initiated for ${quantity} units of ${commodity.name}`);
    navigate('/buyer-dashboard');
  };

  if (!commodity) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-800 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Marketplace
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Purchase {commodity.name}</h1>
          <p className="text-gray-600">Seller: {commodity.seller} • {commodity.location}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Left Column - Order Details */}
          <div className="md:col-span-2 p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiPackage className="mr-2 text-emerald-600" />
                Order Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (units)</label>
                  <input
                    type="number"
                    min={commodity.minOrder}
                    max={commodity.totalAvailable}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(commodity.minOrder, parseInt(e.target.value) || commodity.minOrder))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum order: {commodity.minOrder} units
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    ${commodity.price.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Option</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'standard', name: 'Standard', time: '7-10 days', cost: 0 },
                    { id: 'express', name: 'Express', time: '3-5 days', cost: 50 }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setDeliveryOption(option.id)}
                      className={`p-3 border rounded-lg text-left ${deliveryOption === option.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                    >
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-600">{option.time}</div>
                      <div className="text-sm">{option.cost > 0 ? `+$${option.cost}` : 'Free'}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <div className="space-y-2">
                  <div 
                    onClick={() => setPaymentMethod('escrow')} 
                    className={`p-3 border rounded-lg cursor-pointer ${paymentMethod === 'escrow' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center">
                      <FaRegHandshake className="mr-2 text-emerald-600" />
                      <span className="font-medium">Escrow Protection</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Pay into secure escrow, released only after delivery confirmation
                    </p>
                  </div>
                  <div 
                    onClick={() => setPaymentMethod('direct')} 
                    className={`p-3 border rounded-lg cursor-pointer ${paymentMethod === 'direct' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center">
                      <FiDollarSign className="mr-2 text-gray-600" />
                      <span className="font-medium">Direct Payment</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Pay seller directly (not recommended for large orders)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FiDollarSign className="mr-2 text-emerald-600" />
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Unit Price × {quantity}</span>
                <span>${(commodity.price * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>{deliveryOption === 'express' ? '$50.00' : 'Free'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span>$15.00</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                <span>Total</span>
                <span className="text-emerald-600">
                  ${(commodity.price * quantity + (deliveryOption === 'express' ? 50 : 0) + 15).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                <FiShield className="mr-2" />
                Secure Transaction
              </h3>
              <p className="text-sm text-blue-700">
                {paymentMethod === 'escrow' 
                  ? 'Your funds will be held in escrow until delivery is confirmed.'
                  : 'You are paying the seller directly. We recommend using escrow for better protection.'}
              </p>
            </div>

            <button
              onClick={handlePurchase}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm"
            >
              Confirm Purchase
            </button>

            <div className="mt-4 text-xs text-gray-500">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCommodity;