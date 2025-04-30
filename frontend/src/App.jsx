import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import TradePage from './pages/TradePage';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import PurchaseCommodity from './pages/buyer/PurchaseCommodity';
import ViewPurchase from './pages/buyer/ViewPurchase';
import DisputeSale from './pages/buyer/DisputeSale';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerOverview from './pages/seller/SellerOverview';
import MyCommodities from './pages/seller/MyCommodities';
import CreateCommodity from './pages/seller/CreateCommodity';
import Disputes from './pages/seller/Disputes';
import DisputeDetail from './pages/seller/Disputes';

// Configure Wagmi
const config = getDefaultConfig({
  appName: "Your App Name",
  projectId: "YOUR_PROJECT_ID", // Get from WalletConnect Cloud
  chains: [baseSepolia],
});

// Create query client
const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <Routes>
              {/* Special route for landing page to include all its content */}
              <Route 
                path="/" 
                element={
                  <Layout>
                    <LandingPage />
                  </Layout>
                } 
              />
              
              {/* Other routes using the layout normally */}
              <Route path="/" element={<Layout />}>
                {/* Trade Page */}
                <Route path="trade" element={<TradePage />} />
                
                {/* Buyer Routes */}
                <Route path="buyer-dashboard" element={<BuyerDashboard />} />
                <Route path="buyer-dashboard/purchase-commodity/:id" element={<PurchaseCommodity />} />
                <Route path="buyer-dashboard/view-purchase/:id" element={<ViewPurchase />} />
                <Route path="buyer-dashboard/dispute-sale/:id" element={<DisputeSale />} />
                
                {/* Seller Routes - Nested under SellerDashboard */}
                <Route path="seller-dashboard" element={<SellerDashboard />}>
                  <Route index element={<SellerOverview />} />
                  <Route path="my-commodities" element={<MyCommodities />} />
                  <Route path="create-commodity" element={<CreateCommodity />} />
                  <Route path="disputes" element={<Disputes />} />
                  <Route path="disputes/:id" element={<DisputeDetail />} />
                </Route>
              </Route>
            </Routes>
          </Router>
       
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;