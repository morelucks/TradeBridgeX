import { useState } from "react";
import { useAllCommodities } from "../../hooks/useGetAllCommodities";
import Image1 from "../../../public/famer.jpeg";
import PurchaseModal from "../../modals/PurchaseModal"
import { formatEther } from "viem";
import {
  FiSearch,
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiMapPin,
  FiImage,
  FiUser,
} from "react-icons/fi";

const SellerMarketPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { commodities, isLoading: commoditiesLoading } = useAllCommodities();
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const handlePurchase = (commodity) => {
    setSelectedCommodity(commodity);
  };
  const filteredCommodities = commodities.filter((commodity) =>
    commodity.commodityTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Filtered Commodities:", filteredCommodities);

  const renderCommodityCard = (commodity) => {
    const imageUrl = getCommodityImage(commodity);

    return (
      <div
        key={commodity.commodityId.toString()}
        className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
      >
        <div className="relative h-48 bg-gray-100">
          {/* Image with error handling */}
          <img
            src={imageUrl}
            alt={commodity.commodityTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite error loop
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />

          {/* Price badge */}
          {/* <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm flex items-center">
                  <FiDollarSign className="text-emerald-600 mr-1" />
                  <span className="font-medium">
                    {formatEther(commodity.pricePerQuantity)} ETH
                  </span>
                </div> */}

          {/* Location badge */}
          <div className="absolute bottom-3 left-3 bg-white/80 px-2 py-1 rounded-lg text-xl flex items-center">
            <FiMapPin className="text-gray-800 mr-1" />
            <span>{commodity.commodityLocation || "Unknown location"}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">
            {commodity.commodityTitle}
          </h3>

          <div className="flex items-center mt-2 text-sm text-gray-600">
            <FiPackage className="mr-1" />
            <span>
              {commodity.commodityQuantity.toString()}{" "}
              {commodity.quantityMeasurement} available
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {commodity.commodityDescription.split("\n")[0]}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePurchase(commodity)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center text-sm"
            >
              <FiShoppingCart className="mr-2" />
              Purchase
            </button>

            <div className=" top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm flex items-center">
              <FiDollarSign className="text-emerald-600 mr-1" />
              <span className="font-medium">
                {formatEther(commodity.pricePerQuantity)/0.00000000000000001} USD
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getCommodityImage = (commodity) => {
    if (
      commodity.imageURL &&
      commodity.imageURL.includes("pinata") &&
      !commodity.imageURL.includes("placeholder")
    ) {
      return commodity.imageURL;
    }

    if (
      commodity.imageURL &&
      commodity.imageURL.startsWith("http") &&
      !commodity.imageURL.includes("example.com")
    ) {
      return commodity.imageURL;
    }

    return Image1;
  };
  return (
    <div>
      <div>
        {commoditiesLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredCommodities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCommodities.map(renderCommodityCard)}
          </div>
        ) : (
          <div className="text-center p-12 bg-gray-50 rounded-lg">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No commodities found
            </h3>
            <p className="mt-1 text-gray-500">
              There are no commodities matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {selectedCommodity && (
        <PurchaseModal
          isOpen={!!selectedCommodity}
          onClose={() => setSelectedCommodity(null)}
          commodity={selectedCommodity}
        />
      )}
    </div>
  );
};

export default SellerMarketPlace;
