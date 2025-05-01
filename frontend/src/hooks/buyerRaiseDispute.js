import { useWriteContract } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json';
import { CONTRACT_ADDRESS } from '../abi/address';

export function useBuyerRaiseDispute() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const raiseDispute = (defaulter, commodityId, report) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: TradeBridge,
      functionName: 'buyerRaiseDispute',
      args: [defaulter, BigInt(commodityId), report],
    });
  };

  return {
    raiseDispute,
    isPending,
    isSuccess,
    error,
  };
}