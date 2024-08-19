import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import NFTPage from './components/NFTpage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoyaltyProgram from './components/LoyaltyProgram';

// Main application component rendering the routes
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='app w-full min-h-full'>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-5 px-6">
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/loyaltypoints" element={<LoyaltyProgram />} />
            <Route path="/sellNFT" element={<SellNFT />} />
            <Route path="/nftPage/:tokenId" element={<NFTPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

// Performance reporting
reportWebVitals();
