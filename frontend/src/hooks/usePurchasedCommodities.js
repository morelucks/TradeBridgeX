import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json';
import Token from '../abi/Token.json';
import { contractAddress } from '../abi/address';
import { TokenAddress } from '../abi/TokenAddress';


export function usePurchasedCommoditiesByUser(userAddress) {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const { 
    data: salesData, 
    isLoading: salesLoading, 
    error: salesError 
  } = useReadContract({
    address: contractAddress,
    abi: TradeBridge,
    functionName: 'getPurchasedCommoditiesByUser',
    args: [userAddress],
    enabled: !!userAddress,
  });

 
  useEffect(() => {
    const fetchCommodityDetails = async () => {
      if (salesError) {
        setError(salesError);
        setIsLoading(false);
        return;
      }

      if (!salesData || salesLoading) {
        return;
      }

      try {
        
        const processedPurchases = await Promise.all(
          salesData.map(async (sale, index) => {
            const { commodity } = useCommodityByIndex(Number(sale.commodityId));
            
           
            const date = commodity?.createdAt 
              ? new Date(Number(commodity.createdAt) * 1000).toLocaleDateString() 
              : "N/A";

          
            return {
              id: index,
              commodityId: Number(sale.commodityId),
              commodity: commodity?.commodityTitle || `Commodity #${sale.commodityId}`,
              seller: `${sale.seller.slice(0, 6)}...${sale.seller.slice(-4)}`,
              buyer: sale.buyer,
              price: Number(sale.quantity) * (commodity?.pricePerQuantity ? Number(commodity.pricePerQuantity) / 1e18 : 0),
              quantity: Number(sale.quantity),
              date: date,
              status: "Processing",
              sellerAddress: sale.seller,
              location: commodity?.commodityLocation || "N/A",
              measurement: commodity?.quantityMeasurement || "units",
              imageURL: commodity?.imageURL || "",
            };
          })
        );

        setPurchases(processedPurchases);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommodityDetails();
  }, [salesData, salesLoading, salesError, userAddress]);

  return {
    purchases,
    isLoading,
    error,
  };
}