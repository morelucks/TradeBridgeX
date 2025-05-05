import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

const Navbar = ({ onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg backdrop-blur-md bg-opacity-90"
          : "bg-transparent"
      }`}
    >
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
            <Link
              to="/about"
              className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/buyer-dashboard"
              className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors"
            >
              Markets
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/news"
              className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors"
            >
              News
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className="relative group text-gray-700 hover:text-amber-500 font-medium transition-colors"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="bg-gradient-to-r from-emerald-400 to-amber-400 text-white px-8 py-3 rounded-lg hover:from-emerald-500  hover:to-amber-500 transition-all shadow-lg ml-5">
                <ConnectButton.Custom>
                  {({
                    account,
                    openAccountModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const connected = mounted && account;

                    return (
                      <div>
                        {connected ? (
                          <button
                            onClick={openAccountModal}
                            className="flex items-center"
                          >
                            <span className="text-white font-medium">
                              {account.displayName}
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={openConnectModal}
                            className="flex items-center"
                          >
                            <span className="text-white font-medium">
                              Connect Wallet
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg ml-5">
                <ConnectButton.Custom>
                  {({
                    account,
                    openAccountModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const connected = mounted && account;

                    return (
                      <div>
                        {connected ? (
                          <button
                            onClick={openAccountModal}
                            className="flex items-center"
                          >
                            <span className="text-white font-medium">
                              {account.displayName}
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={openConnectModal}
                            className="flex items-center"
                          >
                            <span className="text-white font-medium">
                              Connect Wallet
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
