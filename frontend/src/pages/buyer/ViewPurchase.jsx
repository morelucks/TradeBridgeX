import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiCalendar, FiTruck, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';

const ViewPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock purchase data - replace with API call
  const purchase = {
    id: id,
    commodity: 'Premium Wheat',
    seller: 'FarmCo',
    price: 645.75,
    quantity: 150,
    total: 96862.50,
    orderDate: '2023-06-15',
    estimatedDelivery: '2023-06-22',
    status: 'In Transit',
    trackingNumber: 'TRK123456789',
    deliveryAddress: '123 Farm Lane, Agricultural District, Kansas 67890, USA',
    paymentMethod: 'Escrow',
    disputeEligible: true
  };

  const handleOpenDispute = () => {
    navigate(`/buyer-dashboard/dispute-sale/${id}`);
  };

  const statusConfig = {
    'Processing': { color: 'bg-yellow-100 text-yellow-800', icon: <FiPackage className="mr-2" /> },
    'In Transit': { color: 'bg-blue-100 text-blue-800', icon: <FiTruck className="mr-2" /> },
    'Delivered': { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="mr-2" /> },
    'Disputed': { color: 'bg-red-100 text-red-800', icon: <FiAlertCircle className="mr-2" /> }
  };

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
            Back to Purchases
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order #{purchase.id}</h1>
              <p className="text-gray-600">{purchase.commodity} from {purchase.seller}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[purchase.status].color} flex items-center`}>
              {statusConfig[purchase.status].icon}
              {purchase.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Left Column - Order Details */}
          <div className="md:col-span-2 p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiPackage className="mr-2 text-emerald-600" />
                Order Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Commodity</h3>
                  <p className="mt-1">{purchase.commodity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Seller</h3>
                  <p className="mt-1">{purchase.seller}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                  <p className="mt-1">{purchase.quantity} units</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Unit Price</h3>
                  <p className="mt-1">${purchase.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                  <p className="mt-1 flex items-center">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {purchase.orderDate}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estimated Delivery</h3>
                  <p className="mt-1 flex items-center">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {purchase.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiTruck className="mr-2 text-emerald-600" />
                Delivery Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tracking Number</h3>
                  <p className="mt-1">{purchase.trackingNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                  <p className="mt-1">{purchase.deliveryAddress}</p>
                </div>
              </div>
            </div>

            {purchase.disputeEligible && purchase.status !== 'Delivered' && (
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleOpenDispute}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg flex items-center"
                >
                  <FiAlertCircle className="mr-2" />
                  Open Dispute
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Only open a dispute if there are issues with your order.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Payment Summary */}
          <div className="bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${(purchase.price * purchase.quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span>$15.00</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                <span>Total Paid</span>
                <span className="text-emerald-600">${purchase.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h3>
              <p>{purchase.paymentMethod}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-700 mb-3">
                Contact our support team if you have any questions about your order.
              </p>
              <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                <BsChatDots className="mr-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPurchase;