import { useState, useEffect } from 'react';
import {
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json';
import Token from '../abi/Token.json';
import { contractAddress } from '../abi/address';
import { TokenAddress } from '../abi/TokenAddress';

export function usePurchaseCommodity() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [approvalHash, setApprovalHash] = useState(null);
  const [purchaseHash, setPurchaseHash] = useState(null);
  const [pendingCommodity, setPendingCommodity] = useState(null);
  
  const { writeContractAsync } = useWriteContract();
  
  // Watch approval transaction
  const {
    isLoading: isApprovalLoading,
    isSuccess: isApprovalSuccess,
    isError: isApprovalError,
    error: approvalError
  } = useWaitForTransactionReceipt({
    hash: approvalHash,
  });
  
  // Watch purchase transaction
  const {
    isLoading: isPurchaseLoading,
    isSuccess: isPurchaseSuccess,
    isError: isPurchaseError,
    error: purchaseError
  } = useWaitForTransactionReceipt({
    hash: purchaseHash,
  });
  
  // Update pending state
  useEffect(() => {
    setIsPending(isApprovalLoading || isPurchaseLoading);
  }, [isApprovalLoading, isPurchaseLoading]);
  
  // Handle errors
  useEffect(() => {
    if (isApprovalError) {
      setError(approvalError);
      setIsPending(false);
      setPendingCommodity(null);
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
      setPendingCommodity(null);
    }
  }, [isPurchaseSuccess]);
  
  // Automatically execute purchase after approval succeeds
  useEffect(() => {
    const executePurchase = async () => {
      if (isApprovalSuccess && pendingCommodity) {
        try {
          const { commodityId, quantity } = pendingCommodity;
          
          const hash = await writeContractAsync({
            address: contractAddress,
            abi: TradeBridge,
            functionName: 'buyCommodity',
            args: [BigInt(commodityId), BigInt(quantity)],
          });
          
          setPurchaseHash(hash);
        } catch (err) {
          setError(err);
          setIsPending(false);
          setPendingCommodity(null);
        }
      }
    };
    
    executePurchase();
  }, [isApprovalSuccess, pendingCommodity, writeContractAsync]);
  
  const purchaseCommodity = async (commodityId, quantity, totalPrice) => {
    try {
      // Reset states
      setError(null);
      setIsSuccess(false);
      setIsPending(true);
      setApprovalHash(null);
      setPurchaseHash(null);
      
      // Store commodity info for purchase step
      setPendingCommodity({ commodityId, quantity });
      
      // Initiate approval
      const hash = await writeContractAsync({
        address: TokenAddress,
        abi: Token,
        functionName: 'approve',
        args: [contractAddress, BigInt(totalPrice)],
      });
      
      setApprovalHash(hash);
    } catch (err) {
      setError(err);
      setIsPending(false);
      setPendingCommodity(null);
    }
  };
  
  return {
    purchaseCommodity,  
    isPending,
    isSuccess,
    error,
    approvalHash,
    purchaseHash
  };
}