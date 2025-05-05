import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json';
import Token from '../abi/Token.json';
import { contractAddress } from '../abi/address';
import { TokenAddress } from '../abi/TokenAddress';

export function usePurchaseCommodity() {
  // State for tracking overall process
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Approval transaction
  const {
    writeContract: writeApproval,
    data: approvalHash,
    isPending: isApprovalPending,
    isError: isApprovalError,
    error: approvalError,
  } = useWriteContract();

  // Purchase transaction
  const {
    writeContract: writePurchase,
    data: purchaseHash,
    isPending: isPurchasePending,
    isError: isPurchaseError,
    error: purchaseError,
  } = useWriteContract();

 
  const { isSuccess: isApprovalSuccess, isLoading: isApprovalLoading } =
    useWaitForTransactionReceipt({
      hash: approvalHash,
    });

  
  const { isSuccess: isPurchaseSuccess, isLoading: isPurchaseLoading } =
    useWaitForTransactionReceipt({
      hash: purchaseHash,
    });

  useEffect(() => {
    setIsPending(isApprovalPending || isApprovalLoading || isPurchasePending || isPurchaseLoading);
  }, [isApprovalPending, isApprovalLoading, isPurchasePending, isPurchaseLoading]);


  useEffect(() => {
    if (isApprovalError) {
      setError(approvalError);
      setIsPending(false);
    }
    if (isPurchaseError) {
      setError(purchaseError);
      setIsPending(false);
    }
  }, [isApprovalError, isPurchaseError, approvalError, purchaseError]);

  // Handle purchase success
  useEffect(() => {
    if (isPurchaseSuccess) {
      setIsSuccess(true);
      setIsPending(false);
    }
  }, [isPurchaseSuccess]);

  useEffect(() => {
    
    if (isApprovalSuccess && approvalHash && window.__pendingPurchase) {
      const { commodityId, quantity } = window.__pendingPurchase;
      console.log(commodityId, quantity)
      writePurchase({
        address: contractAddress,
        abi: TradeBridge,
        functionName: 'buyCommodity',
        args: [BigInt(commodityId), BigInt(quantity)],
      });
      delete window.__pendingPurchase; 
    }
  }, [isApprovalSuccess, approvalHash, writePurchase]);

  
  const purchaseCommodity = async (commodityId, quantity, totalPrice) => {
    try {
      setError(null);
      setIsSuccess(false);
      setIsPending(true);

     
      window.__pendingPurchase = { commodityId, quantity };

      // Initiate approval
      writeApproval({
        address: TokenAddress,
        abi: Token,
        functionName: 'approve',
        args: [contractAddress, BigInt(totalPrice)],
      });
    } catch (err) {
      setError(err);
      setIsPending(false);
      delete window.__pendingPurchase;
    }
  };

  return {
    purchaseCommodity,
    isPending,
    isSuccess,
    error,
    approvalHash,
    purchaseHash,
  };
}