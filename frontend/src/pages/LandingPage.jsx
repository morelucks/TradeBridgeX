import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser, AiOutlineShoppingCart, AiOutlineArrowRight } from "react-icons/ai";
import { FiTrendingUp, FiShield, FiGlobe, FiDollarSign, FiExternalLink } from "react-icons/fi";
import { motion, useAnimation, useInView } from "framer-motion";
import { use3dEffect } from 'use-3d-effect';
import ReactGlobe from 'react-globe.gl';

const AuthModal = ({ isOpen, onClose, onConnectWallet }) => {
  const [activeTab, setActiveTab] = useState('buyer');
  const [username, setUsername] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Here you would call your wallet connection logic
      await onConnectWallet(activeTab, username);
      onClose();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            Connect to CommX
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'buyer' 
                ? 'text-emerald-600 border-b-2 border-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            <AiOutlineShoppingCart />
            <span>Buyer</span>
          </button>
          <button
            className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'seller' 
                ? 'text-amber-600 border-b-2 border-amber-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('seller')}
          >
            <AiOutlineUser />
            <span>Seller</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Connect your wallet
            </h4>
            <div className="space-y-3">
              <button 
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeTab === 'buyer' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {activeTab === 'buyer' ? <AiOutlineShoppingCart size={20} /> : <AiOutlineUser size={20} />}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">
                      {activeTab === 'buyer' ? 'Buyer Wallet' : 'Seller Wallet'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Connect as {activeTab}
                    </p>
                  </div>
                </div>
                <FiExternalLink className="text-gray-400" />
              </button>
            </div>
          </div>

          <button
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              activeTab === 'buyer' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-amber-600 hover:bg-amber-700'
            } flex items-center justify-center`}
            onClick={handleConnect}
            disabled={isConnecting || !username}
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : (
              `Connect as ${activeTab}`
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Header = ({ onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg backdrop-blur-md bg-opacity-90" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              <span className="text-emerald-500">Comm</span>
              <span className="text-amber-500">X</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/about" className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors">
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/markets" className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors">
              Markets
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/news" className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors">
              News
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={onOpenAuth}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all shadow-emerald-500/20"
              >
                Login
              </button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700 text-2xl"
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 bg-white z-40 md:hidden"
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleSidebar} className="text-gray-700 text-2xl">
              <AiOutlineClose />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-8 pt-10">
            {["About", "Markets", "News", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/${item.toLowerCase()}`} 
                  className="text-xl text-gray-700 hover:text-amber-500 transition-colors"
                  onClick={toggleSidebar}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => {
                  onOpenAuth();
                  toggleSidebar();
                }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg w-64 text-center shadow-emerald-500/20"
              >
                Login
              </button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

const PriceTicker = ({ commodities, color }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContentWidth(containerRef.current.scrollWidth);
    }
  }, []);

  const duration = contentWidth / 100;

  return (
    <div className="relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm p-4">
      <h3 className={`flex items-center text-sm font-semibold mb-3 ${color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>
        <span className={`w-2 h-6 ${color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'} mr-2 rounded-full`}></span>
        {color === 'emerald' ? 'Agricultural Commodities' : 'Minerals & Precious Metals'}
      </h3>
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          animate={{
            x: [0, -contentWidth + containerWidth],
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: duration,
              ease: "linear",
            },
          }}
          className="flex"
        >
          {[...commodities, ...commodities].map((commodity, index) => (
            <div key={index} className="flex items-center mx-6 whitespace-nowrap">
              <span className="font-medium text-white">{commodity.name}</span>
              <span className={`ml-2 font-bold ${commodity.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                ${commodity.price.toLocaleString()} / {commodity.unit}
                {commodity.trend === 'up' ? ' ↑' : ' ↓'}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl backdrop-blur-sm bg-white/5 border ${color === 'emerald' ? 'border-emerald-500/20' : 'border-amber-500/20'} hover:shadow-lg transition-all`}
    >
      <div className={`text-3xl mb-4 ${color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

const Hero = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Mock data for commodity prices
  const agricCommodities = [
    { name: "Sorghum", price: 10, unit: "ton", trend: "up" },
    { name: "Wheat", price: 280, unit: "ton", trend: "down" },
    { name: "Soybeans", price: 375, unit: "ton", trend: "up" },
    { name: "Corn", price: 145, unit: "ton", trend: "up" },
    { name: "Rice", price: 420, unit: "ton", trend: "down" },
    { name: "Coffee", price: 4.25, unit: "kg", trend: "up" },
    { name: "Cocoa", price: 5.80, unit: "kg", trend: "up" },
    { name: "Sugar", price: 0.25, unit: "kg", trend: "down" }
  ];

  const mineralCommodities = [
    { name: "Gold", price: 2150, unit: "oz", trend: "up" },
    { name: "Silver", price: 28.5, unit: "oz", trend: "up" },
    { name: "Copper", price: 4.10, unit: "lb", trend: "down" },
    { name: "Iron Ore", price: 112, unit: "ton", trend: "down" },
    { name: "Platinum", price: 975, unit: "oz", trend: "up" },
    { name: "Palladium", price: 1020, unit: "oz", trend: "down" },
    { name: "Lithium", price: 36500, unit: "ton", trend: "up" },
    { name: "Bauxite", price: 58, unit: "ton", trend: "down" }
  ];

  // 3D effect for hero section
  const { ref: heroRef, onMouseMove, style } = use3dEffect({ perspective: 1000 });

  const handleConnectWallet = async (userType, username) => {
    // Implement your wallet connection logic here
    console.log(`Connecting as ${userType} with username: ${username}`);
    // Redirect based on user type
    if (userType === 'buyer') {
      // Redirect to buyer dashboard
      window.location.href = '/buyer-dashboard';
    } else {
      // Redirect to seller dashboard
      window.location.href = '/seller-dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-hidden">
      <Header onOpenAuth={() => setShowAuthModal(true)} />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onConnectWallet={handleConnectWallet}
      />
      
      {/* Hero Section */}
      <section className="pt-20 relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-amber-900/10"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-20 animate-float1"></div>
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl opacity-20 animate-float2"></div>
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl opacity-20 animate-float3"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-24 pb-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Column - Main Content */}
            <div className="w-full lg:w-1/2 mb-16 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                  Next-Gen Commodity Trading
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
              >
                Revolutionizing global trade with blockchain-powered, AI-optimized commodity exchange platform. Zero intermediaries, maximum transparency.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/trade"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl shadow-emerald-500/30"
                  >
                    Start Trading <AiOutlineArrowRight className="ml-2" />
                  </Link>
                </motion.div>
                
                <div className="flex space-x-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <AiOutlineShoppingCart className="mr-2 text-amber-400" /> Buyer Login
                    </button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <AiOutlineUser className="mr-2 text-emerald-400" /> Seller Login
                    </button>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Price Tickers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4"
              >
                <PriceTicker commodities={agricCommodities} color="emerald" />
                <PriceTicker commodities={mineralCommodities} color="amber" />
              </motion.div>
            </div>
            
            {/* Right Column - Visualization */}
            <motion.div 
              ref={heroRef}
              style={style}
              onMouseMove={onMouseMove}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-1/2 lg:pl-12 mt-12 lg:mt-0"
            >
              <div className="relative overflow-hidden rounded-3xl border border-gray-700/50 shadow-2xl p-1 h-[500px]">
                {/* Interactive Globe Visualization */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-amber-900/30 rounded-2xl"></div>
                <div className="relative h-full w-full flex items-center justify-center">
                  <ReactGlobe
                    height="100%"
                    width="100%"
                    globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
                    points={[
                      { lat: 40.7128, lng: -74.0060, size: 10, color: 'emerald' }, // New York
                      { lat: 51.5074, lng: -0.1278, size: 10, color: 'emerald' },  // London
                      { lat: 35.6762, lng: 139.6503, size: 10, color: 'emerald' }, // Tokyo
                      { lat: -33.8688, lng: 151.2093, size: 10, color: 'amber' },  // Sydney
                      { lat: 22.3193, lng: 114.1694, size: 10, color: 'amber' },   // Hong Kong
                      { lat: -23.5505, lng: -46.6333, size: 10, color: 'amber' }, // São Paulo
                    ]}
                    pointColor={point => point.color === 'emerald' ? '#10b981' : '#f59e0b'}
                    pointAltitude={0.05}
                    pointRadius={1.5}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center p-8 backdrop-blur-sm bg-black/30 rounded-xl border border-gray-700/50 max-w-xs">
                      <span className="text-2xl font-bold text-white mb-4">Global Trading Network</span>
                      <p className="text-gray-300">Real-time connections across 62 countries</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Platform Benefits */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard 
                    icon={<FiTrendingUp />} 
                    title="Real-Time Pricing" 
                    description="AI-powered live market data analytics" 
                    color="emerald"
                  />
                  <FeatureCard 
                    icon={<FiShield />} 
                    title="Secure Trading" 
                    description="Blockchain-verified smart contracts" 
                    color="amber"
                  />
                  <FeatureCard 
                    icon={<FiGlobe />} 
                    title="Global Access" 
                    description="Seamless cross-border transactions" 
                    color="amber"
                  />
                  <FeatureCard 
                    icon={<FiDollarSign />} 
                    title="Low Fees" 
                    description="Fraction of traditional exchange costs" 
                    color="emerald"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Bar */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-emerald-900/80 to-amber-900/80 py-12 text-white border-t border-b border-gray-700/50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$13.8M", label: "Daily Volume" },
              { value: "8,400+", label: "Active Traders" },
              { value: "62", label: "Countries" },
              { value: "120+", label: "Commodities" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-bold mb-1 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(5deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -10px) rotate(2deg); }
        }
        
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
        
        .animate-float3 {
          animation: float3 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;