import { useWriteContract } from 'wagmi';
import TradeBridge from '../abi/TradeBridge.json';
import { contractAddress } from '../abi/address';
import axios from 'axios';
import { useState } from 'react';

export function useAddCommodity() {
  const { writeContract, isPending: contractPending, isSuccess, error: contractError } = useWriteContract();
  const [uploadStatus, setUploadStatus] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const uploadImageToPinata = async (imageFile) => {
    if (!imageFile) return null;

    try {
      setUploadStatus("Uploading image to IPFS via Pinata...");
      // Create form data for Pinata API
      const formData = new FormData();
      formData.append("file", imageFile);

      const metadata = JSON.stringify({
        name: `Commodity_Image_${Date.now()}`,
        keyvalues: {
          createdAt: Date.now().toString()
        }
      });
      formData.append('pinataMetadata', metadata);

      // Pinata options
      const options = JSON.stringify({
        cidVersion: 0
      });
      formData.append('pinataOptions', options);

      // Pinata API call
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data;`,
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
        }
      );

      const ipfsHash = res.data.IpfsHash;
      const gatewayURL = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      
      setUploadStatus("Image uploaded successfully!");
      return {
        ipfsHash,
        gatewayURL
      };

    } catch (error) {
      console.error("Error uploading image to Pinata:", error);
      setUploadStatus("Failed to upload image to IPFS");
      throw error;
    }
  };

  const addCommodity = async (
    commodityTitle,
    commodityDescription,
    commodityQuantity,
    quantityMeasurement,
    pricePerQuantity,
    imageFile,
    fallbackImageURL,
    commodityLocation
  ) => {
    try {
      setIsPending(true);
      setError(null);
      
      let imageURL = fallbackImageURL;
      let ipfsHash = '';
      
      // If imageFile is provided, upload it to Pinata
      if (imageFile && imageFile instanceof File) {
        const uploadResult = await uploadImageToPinata(imageFile);
        if (uploadResult) {
          ipfsHash = uploadResult.ipfsHash;
          imageURL = uploadResult.gatewayURL;
        }
      }
      
      // Call smart contract with appropriate image data
      await writeContract({
        address: contractAddress,
        abi: TradeBridge,
        functionName: 'addCommodity',
        args: [
          commodityTitle,
          commodityDescription,
          BigInt(commodityQuantity),
          quantityMeasurement,
          BigInt(pricePerQuantity),
          ipfsHash,
          imageURL,
          commodityLocation,
        ]
      });
      
    } catch (error) {
      console.error("Error in addCommodity:", error);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  return {
    addCommodity,
    uploadStatus,
    isPending: isPending || contractPending,
    isSuccess,
    error: error || contractError,
  };
}