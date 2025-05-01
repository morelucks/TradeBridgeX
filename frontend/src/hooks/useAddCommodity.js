import { useWriteContract } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json'
import { contractAddress } from '../abi/address';

export function useAddCommodity() {
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const addCommodity = (
    commodityTitle,
    commodityDescription,
    commodityQuantity,
    quantityMeasurement,
    pricePerQuantity,
    image,
    imageURL,
    commodityLocation
  ) => {
    writeContract({
      address: contractAddress,
      abi: TradeBridge,
      functionName :'addCommodity',
      args: [
        commodityTitle,
        commodityDescription,
        BigInt(commodityQuantity),
        quantityMeasurement,
        BigInt(pricePerQuantity),
        image,
        imageURL,
      commodityLocation,]
    });
  };

  return {
    addCommodity,
    isPending,
    isSuccess,
    error,
  };
}