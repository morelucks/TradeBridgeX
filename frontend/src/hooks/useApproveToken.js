// hooks/useApproveToken.js
import { useWriteContract, useReadContract } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json';
import { contractAddress } from '../abi/address';
import Token from "../abi/Token.json"
import { TokenAddress } from '../abi/TokenAddress';

export function useApproveToken() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const { data: tokenAddress } = useReadContract({
    address: contractAddress,
    abi: TradeBridge,
    functionName: 'tokenAddress',
  });

  const approveToken = (amount) => {
    writeContract({
      address: TokenAddress,
      abi: Token,
      functionName: 'approve',
      args: [
        contractAddress, 
        BigInt(amount)
      ]
    });
  };

  return {
    approveToken,
    isPending,
    isSuccess,
    error,
  };
}