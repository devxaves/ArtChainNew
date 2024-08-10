import React, { useState } from 'react';
import Loyalty1 from '../assets/Loyalty1.png';
import Loyalty2 from '../assets/Loyalty2.png';
import Loyalty3 from '../assets/Loyalty3.png';
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import NFTTile from "./NFTTile";
import AOS from 'aos';
import 'aos/dist/aos.css';


const LoyaltyProgram = () => {


  useEffect(() => {
    AOS.init({
        duration: 2000
    });
});
const [data, updateData] = useState([]);
const [dataFetched, updateFetched] = useState(false);
const [address, updateAddress] = useState("0x");
const [totalPrice, updateTotalPrice] = useState("0");

async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

    //create an NFT Token
    let transaction = await contract.getMyNFTs()

    /*
    * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
    * and creates an object of information that is to be displayed
    */

    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        sumPrice += Number(price);
        return item;
    }))

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
}

const params = useParams();
const tokenId = params.tokenId;
if (!dataFetched)
    getNFTData(tokenId);

  const [amount, setAmount] = useState(1);

  const getCardClass = (cardNumber) => {
    if (data.length <3 ) {
      return 'grayscale';
    }
    else if (data.length<5 && (cardNumber==2 || cardNumber==3)) {
      return 'grayscale';

    }else if(data.length<10 &&  cardNumber==3){
      return 'grayscale';

    }
    return '';
  };

  return (
    <>
   
      <h1 className="text-4xl sm:text-4xl lg:text-5xl text-center text-white tracking-wide m-5 mt-10">
        <b>ArtChain</b>
        <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
          <b> Loyalty Rewards</b>
        </span>
      </h1>
      <div className='flex flex-col justify-center items-center'>
        <div className={`flex flex-row w-3/6 h-auto rounded-lg p-4 m-4 bg-stone-700 bg-glow-custom-2 ${getCardClass(1)}`} >
          <div>
            <img src={Loyalty3} className='w-40 h-auto rounded-lg' alt="Silver Loyalty Card" />
          </div>
          <div className='ml-16'>
            <h1 className='text-2xl text-center font-bold family text-orange-500'>Silver Loyalty Card</h1>
            <h2 className='text-2xl text-white mt-2 family font-medium'>Benefits:</h2>
            <p className='text-xl text-white family font-medium'> Unlocks at 300 Points</p>
          </div>
        </div>
        <div className={`flex flex-row w-3/6 h-auto p-4 m-4 rounded-lg bg-stone-700 bg-glow-custom-2 ${getCardClass(2)}`}>
          <div>
            <img src={Loyalty2} className='w-40 h-auto rounded-lg' alt="Gold Loyalty Card" />
          </div>
          <div className='ml-16'>
            <h1 className='text-2xl text-center font-bold family text-orange-500'>Gold Loyalty Card</h1>
            <h2 className='text-2xl text-white mt-2 family'>Benefits:</h2>
            <p className='text-xl text-white family'>Unlocks at 500 Points</p>
          </div>
        </div>
        <div className={`flex flex-row w-3/6 h-auto rounded-lg p-4 m-4 bg-stone-700 bg-glow-custom-2 ${getCardClass(3)}`}>
          <div>
            <img src={Loyalty1} className='w-40 h-auto rounded-lg' alt="Diamond Loyalty Card" />
          </div>
          <div className='ml-16' data-aos="Fade-up">
            <h1 className='text-2xl text-center font-bold family text-orange-500'>Diamond Loyalty Card</h1>
            <h2 className='text-2xl text-white mt-2 family'>Benefits:</h2>
            <p className='text-xl text-white family'> Unlocks at 1000 Points</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoyaltyProgram;
