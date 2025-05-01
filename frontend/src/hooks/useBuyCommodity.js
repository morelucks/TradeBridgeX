import { useWriteContract } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json';
import { CONTRACT_ADDRESS } from '../abi/address';

export function useBuyCommodity() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const buyCommodity = (commodityId, quantity) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: TradeBridge,
      functionName: 'buyCommodity',
      args: [BigInt(commodityId), BigInt(quantity)],
    });
  };

  return {
    buyCommodity,
    isPending,
    isSuccess,
    error,
  };
}