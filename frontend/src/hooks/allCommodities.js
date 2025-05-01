import { useReadContract } from 'wagmi';
import {TradeBridge } from "../abi/TradeBridge.json"
import { contractAddress } from '../abi/address';
export function useCommodityByIndex(index) {
  const { data, isLoading, error } = useReadContract({
    address: TradeBridge,
    abi: contractAddress,
    functionName: 'allCommodities',
    args: [BigInt(index)],
  });

  const commodity = data
    ? {
        commodityId: BigInt(data.commodityId),
        sellerAddress: data.sellerAddress,
        commodityTitle: data.commodityTitle,
        commodityDescription: data.commodityDescription,
        commodityQuantity: BigInt(data.commodityQuantity),
        quantityMeasurement: data.quantityMeasurement,
        pricePerQuantity: BigInt(data.pricePerQuantity),
        image: data.image,
        imageURL: data.imageURL,
        commodityLocation: data.commodityLocation,
        isAvailable: data.isAvailable,
        hasReceived: data.hasReceived,
        createdAt: BigInt(data.createdAt),
      }
    : null;

  return {
    commodity,
    isLoading,
    error,
  };
}