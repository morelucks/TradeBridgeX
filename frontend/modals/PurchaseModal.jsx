import React, { useState, useEffect } from 'react';
import { usePurchaseCommodity } from '../src/hooks/usePurchaseCommodity';
import { formatEther } from 'viem';
import { FiX, FiShoppingCart, FiCheck, FiLoader } from 'react-icons/fi';

const PurchaseModal = ({ commodity, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { 
    purchaseCommodity, 
    isPending, 
    isSuccess, 
    error, 
    approvalHash, 
    purchaseHash 
  } = usePurchaseCommodity();
  
  const [transactionStep, setTransactionStep] = useState('idle');
  const totalPrice = commodity.pricePerQuantity * BigInt(quantity);
  
  // Update transaction step based on state
  useEffect(() => {
    if (isPending && !approvalHash && !purchaseHash) {
      setTransactionStep('approving');
    } else if (isPending && approvalHash && !purchaseHash) {
      setTransactionStep('approving');
    } else if (isPending && approvalHash && purchaseHash) {
      setTransactionStep('purchasing');
    } else if (isSuccess) {
      setTransactionStep('completed');
    } else {
      setTransactionStep('idle');
    }
  }, [isPending, approvalHash, purchaseHash, isSuccess]);
  
  const handlePurchase = async () => {
    await purchaseCommodity(
      commodity.commodityId, 
      quantity, 
      totalPrice.toString()
    );
  };
  
  // Close modal after successful purchase
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);
  
  const getStatusMessage = () => {
    switch (transactionStep) {
      case 'approving':
        return 'Approving tokens...';
      case 'purchasing':
        return 'Processing purchase...';
      case 'completed':
        return 'Purchase completed!';
      default:
        return 'Confirm Purchase';
    }
  };
  
  const TransactionProgress = () => (
    <div className="mb-6 space-y-4">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          transactionStep === 'approving' || 
          transactionStep === 'purchasing' || 
          transactionStep === 'completed' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-gray-200'
        }`}>
          {transactionStep === 'approving' ? (
            <FiLoader className="animate-spin" size={16} />
          ) : (
            <FiCheck size={16} />
          )}
        </div>
        <div>
          <p className="font-medium">Token Approval</p>
          {approvalHash && (
            <p className="text-xs text-gray-500 mt-1">
              TX: {approvalHash.substring(0, 12)}...{approvalHash.substring(approvalHash.length - 4)}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          transactionStep === 'purchasing' || 
          transactionStep === 'completed' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-gray-200'
        }`}>
          {transactionStep === 'purchasing' ? (
            <FiLoader className="animate-spin" size={16} />
          ) : transactionStep === 'completed' ? (
            <FiCheck size={16} />
          ) : null}
        </div>
        <div>
          <p className="font-medium">Purchase Commodity</p>
          {purchaseHash && (
            <p className="text-xs text-gray-500 mt-1">
              TX: {purchaseHash.substring(0, 12)}...{purchaseHash.substring(purchaseHash.length - 4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-bold text-gray-800">
            Purchase {commodity.commodityTitle}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isPending}
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity (Available: {commodity.commodityQuantity.toLocaleString()})
            </label>
            <input
              type="number"
              min="0"
              max={commodity.commodityQuantity}
              value={quantity}
              onChange={(e) => {
                const value = Math.max(1, Math.min(Number(e.target.value), commodity.commodityQuantity));
                setQuantity(value);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              disabled={isPending || isSuccess}
            />
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Unit Price:</span>
              <span className="font-medium">
                ${formatEther(commodity.pricePerQuantity)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium">{quantity}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total Price:</span>
              <span className="text-emerald-600">
                ${formatEther(totalPrice)}
              </span>
            </div>
          </div>
          
          {transactionStep !== 'idle' && <TransactionProgress />}
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              Error: {error.shortMessage || error.message}
              <button 
                onClick={() => setError(null)} 
                className="float-right font-bold"
              >
                ×
              </button>
            </div>
          )}
          
          <button
            onClick={handlePurchase}
            disabled={isPending || isSuccess}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
              isPending || isSuccess
                ? 'bg-emerald-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white font-medium transition-colors`}
          >
            {isPending ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                {getStatusMessage()}
              </>
            ) : isSuccess ? (
              <>
                <FiCheck className="mr-2" />
                {getStatusMessage()}
              </>
            ) : (
              <>
                <FiShoppingCart className="mr-2" />
                {getStatusMessage()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;