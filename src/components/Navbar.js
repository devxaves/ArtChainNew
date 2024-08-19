import logo from '../logo_3.png';
import fullLogo from '../full_logo.png';
import logonew from '../assets/logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

const [connected, toggleConnect] = useState(false);
const location = useLocation();
const [currAddress, updateAddress] = useState('0x');

async function getAddress() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  updateAddress(addr);
}

// function updateButton() {
//   const ethereumButton = document.querySelector('.enableEthereumButton');
//   ethereumButton.textContent = "Connected";
//   ethereumButton.classList.remove("hover:bg-blue-70");
//   ethereumButton.classList.remove("bg-blue-500");
//   ethereumButton.classList.add("hover:bg-green-70");
//   ethereumButton.classList.add("bg-green-500");
// }

async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0xaa36a7')
    {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
     })
    }  
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        // updateButton();
        console.log("here",connected);
        getAddress();
        window.location.replace(location.pathname)
      });
      toggleConnect(true)
      console.log(connected);
}

  useEffect(() => {
    if(window.ethereum == undefined)
      return;
    let val = window.ethereum.isConnected();
    if(val)
    {
      console.log("here");
      getAddress();
      // updateButton();
    }

    window.ethereum.on('accountsChanged', function(accounts){
      window.location.replace(location.pathname)
    })
  });

    return (
      <>
        <nav className="navback sticky top-0  z-50 py-3 backdrop-blur-xl border-b border-neutral-700/80">
          <ul className='flex items-end justify-between  bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <img src={ logonew } alt="" width={"60px "} height={ "auto "} className="inline-block -mt-2"/>
            <div className='inline-block font-bold text-xl ml-2 WhiteNoUnderLink'>
              NFT Marketplace
            </div>
            </Link>
          </li>
          <li className='w-max'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg text-white'>
            <li className='p-3  underline-effect '>
                <Link to="/loyaltypoints" className='WhiteNoUnderLink'>Loyalty Rewards</Link>
              </li>
              

              <li className='p-3  underline-effect '>
                <Link to="/" className='WhiteNoUnderLink'>Marketplace</Link>
              </li>
                          
              
            
              <li className=' hover:pb-0 p-3 underline-effect '>
                <Link to="/sellNFT" className='WhiteNoUnderLink'>List My NFT</Link>
              </li>
                     
                    
              
              <li className=' hover:pb-0 p-3 underline-effect'>
                <Link to="/profile" className='WhiteNoUnderLink'>Profile</Link>
              </li>
                    
              
              <li className="flex justify-center">
  <button 
    className="ml-4 enableEthereumButton bg-orange-400 hover:bg-orange-700 duration-500 transition-all text-white font-bold py-2 px-4 rounded text-base"
    onClick={connectWebsite}
  >
    {currAddress !== "0x" ? "Connected" : "Connect Wallet"}
  </button>
</li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10   text-sm'>
          {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </div>
      </>
    );
  }

  export default Navbar;