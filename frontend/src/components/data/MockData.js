// Mock data for commodity prices
export const agricCommodities = [
    { name: "Sorghum", price: 10, unit: "ton", trend: "up" },
    { name: "Wheat", price: 280, unit: "ton", trend: "down" },
    { name: "Soybeans", price: 375, unit: "ton", trend: "up" },
    { name: "Corn", price: 145, unit: "ton", trend: "up" },
    { name: "Rice", price: 420, unit: "ton", trend: "down" },
    { name: "Coffee", price: 4.25, unit: "kg", trend: "up" },
    { name: "Cocoa", price: 5.80, unit: "kg", trend: "up" },
    { name: "Sugar", price: 0.25, unit: "kg", trend: "down" }
  ];
  
  export const mineralCommodities = [
    { name: "Gold", price: 2150, unit: "oz", trend: "up" },
    { name: "Silver", price: 28.5, unit: "oz", trend: "up" },
    { name: "Copper", price: 4.10, unit: "lb", trend: "down" },
    { name: "Iron Ore", price: 112, unit: "ton", trend: "down" },
    { name: "Platinum", price: 975, unit: "oz", trend: "up" },
    { name: "Palladium", price: 1020, unit: "oz", trend: "down" },
    { name: "Lithium", price: 36500, unit: "ton", trend: "up" },
    { name: "Bauxite", price: 58, unit: "ton", trend: "down" }
  ];
  
  // Stats for the Stats Bar
  export const statsData = [
    { value: "$13.8M", label: "Daily Volume" },
    { value: "8,400+", label: "Active Traders" },
    { value: "62", label: "Countries" },
    { value: "120+", label: "Commodities" }
  ];
  
  // Globe points data
  export const globePoints = [
    { lat: 40.7128, lng: -74.0060, size: 10, color: 'emerald' }, // New York
    { lat: 51.5074, lng: -0.1278, size: 10, color: 'emerald' },  // London
    { lat: 35.6762, lng: 139.6503, size: 10, color: 'emerald' }, // Tokyo
    { lat: -33.8688, lng: 151.2093, size: 10, color: 'amber' },  // Sydney
    { lat: 22.3193, lng: 114.1694, size: 10, color: 'amber' },   // Hong Kong
    { lat: -23.5505, lng: -46.6333, size: 10, color: 'amber' }, // São Paulo
  ];
  
  // Feature cards data
  export const featureCardsData = [
    {
      icon: "FiTrendingUp",
      title: "Real-Time Pricing",
      description: "AI-powered live market data analytics",
      color: "emerald"
    },
    {
      icon: "FiShield",
      title: "Secure Trading",
      description: "Blockchain-verified smart contracts",
      color: "amber"
    },
    {
      icon: "FiGlobe",
      title: "Global Access",
      description: "Seamless cross-border transactions",
      color: "amber"
    },
    {
      icon: "FiDollarSign",
      title: "Low Fees",
      description: "Fraction of traditional exchange costs",
      color: "emerald"
    }
  ];