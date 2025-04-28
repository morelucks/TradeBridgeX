import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiShoppingCart, FiUser, FiHelpCircle } from 'react-icons/fi';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Only shown on non-landing pages */}
      {location.pathname !== '/' && (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white"}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="flex items-center">
                <div className="text-2xl font-bold">
                  <span className="text-emerald-600">Comm</span>
                  <span className="text-amber-500">X</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/trade" 
                  className={`font-medium ${location.pathname === '/trade' ? 'text-amber-500' : 'text-gray-700 hover:text-amber-500'}`}
                >
                  Trade
                </Link>
                <Link 
                  to="/buyer-dashboard" 
                  className={`font-medium ${location.pathname.startsWith('/buyer-dashboard') ? 'text-amber-500' : 'text-gray-700 hover:text-amber-500'}`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/markets" 
                  className={`font-medium ${location.pathname === '/markets' ? 'text-amber-500' : 'text-gray-700 hover:text-amber-500'}`}
                >
                  Markets
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Login
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleSidebar}
                className="md:hidden text-gray-700 text-2xl"
              >
                {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="fixed inset-0 bg-white z-40 md:hidden">
              <div className="flex justify-end p-4">
                <button onClick={toggleSidebar} className="text-gray-700 text-2xl">
                  <AiOutlineClose />
                </button>
              </div>
              <nav className="flex flex-col items-center space-y-6 pt-10">
                <Link 
                  to="/trade" 
                  className="text-xl text-gray-700"
                  onClick={toggleSidebar}
                >
                  Trade
                </Link>
                <Link 
                  to="/buyer-dashboard" 
                  className="text-xl text-gray-700"
                  onClick={toggleSidebar}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/markets" 
                  className="text-xl text-gray-700"
                  onClick={toggleSidebar}
                >
                  Markets
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg w-64 text-center"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
              </nav>
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-grow ${location.pathname !== '/' ? 'pt-20' : ''}`}>
        {location.pathname === '/' ? children : <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">
                <span className="text-emerald-400">Comm</span>
                <span className="text-amber-400">X</span>
              </h3>
              <p className="text-gray-400">Global commodity trading platform</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/trade" className="text-gray-400 hover:text-white">Trade</Link></li>
                <li><Link to="/buyer-dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@commx.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} CommX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;