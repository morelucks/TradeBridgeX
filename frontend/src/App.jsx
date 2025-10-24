import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import SellerMarketPlace from './pages/seller/MarketPlace';

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

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://dashboard.reown.com
const projectId = 'efa88b485a8a94ac3519660c217f66c9'

// 2. Create a metadata object - optional
const metadata = {
  name: 'TradeBridge',
  description: 'TradeBridge - Decentralized Trading Platform',
  url: 'https://tradebridge.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [baseSepolia]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

function App() {
  return (
    <AppKitProvider>
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
              <Route path="marketplace" element={<SellerMarketPlace/>} />
              <Route path="disputes/:id" element={<DisputeDetail />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppKitProvider>
  );
}

export default App;