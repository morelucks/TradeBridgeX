import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineArrowRight } from "react-icons/ai";
import { FiTrendingUp, FiShield, FiGlobe, FiDollarSign } from "react-icons/fi";
import { motion, useAnimation, useInView } from "framer-motion";
import { use3dEffect } from 'use-3d-effect';
import ReactGlobe from 'react-globe.gl';
import Navbar from '../components/Navbar';


import AuthModal from '../components/AuthModal';
import { 
  agricCommodities, 
  mineralCommodities, 
  statsData, 
  globePoints,
  featureCardsData 
} from '../components/data/MockData';

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
  

  const renderIcon = () => {
    switch(icon) {
      case 'FiTrendingUp': return <FiTrendingUp />;
      case 'FiShield': return <FiShield />;
      case 'FiGlobe': return <FiGlobe />;
      case 'FiDollarSign': return <FiDollarSign />;
      default: return null;
    }
  };

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
        {renderIcon()}
      </div>
      <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { ref: heroRef, onMouseMove, style } = use3dEffect({ perspective: 1000 });

  const handleConnectWallet = async (userType, username) => {
   
    console.log(`Connecting as ${userType} with username: ${username}`);
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
      {/* Navbar component */}
      <Navbar onOpenAuth={() => setShowAuthModal(true)} />
      
      {/* AuthModal component */}
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
                  {/* <Link
                    to="/trade"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl shadow-emerald-500/30"
                  >
                    Start Trading <AiOutlineArrowRight className="ml-2" />
                  </Link> */}
                </motion.div>
                
                <div className="flex space-x-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="inline-flex items-center justify-center  bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border border-gray-700 px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <AiOutlineShoppingCart className="mr-2 text-amber-400" /> Get Started
                    </button>
                  </motion.div>
                  {/* <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <AiOutlineUser className="mr-2 text-emerald-400" /> Seller Login
                    </button>
                  </motion.div> */}
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
                    points={globePoints}
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
                  {featureCardsData.map((feature, index) => (
                    <FeatureCard
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      color={feature.color}
                    />
                  ))}
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
            {statsData.map((stat, index) => (
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
      
      {/* custom styles for animations */}
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

export default LandingPage;