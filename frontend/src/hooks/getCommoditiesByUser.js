import { useReadContract } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json'
import { contractAddress } from '../abi/address';

export function useCommoditiesByUser(userAddress) {
  const { data, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: TradeBridge,
    functionName: 'getCommoditiesByUser',
    args: [userAddress],
  });

  const purchases= data
    ? data.map(item => ({
        commodityId: BigInt(item.commodityId),
        sellerAddress: item.sellerAddress,
        commodityTitle: item.commodityTitle,
        commodityDescription: item.commodityDescription,
        commodityQuantity: BigInt(item.commodityQuantity),
        quantityMeasurement: item.quantityMeasurement,
        pricePerQuantity: BigInt(item.pricePerQuantity),
        image: item.image,
        imageURL: item.imageURL,
        commodityLocation: item.commodityLocation,
        isAvailable: item.isAvailable,
        hasReceived: item.hasReceived,
        createdAt: BigInt(item.createdAt),
      }))
    : [];

  return {
    purchases,
    isLoading,
    error,
  };
}