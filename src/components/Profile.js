import { useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Profile() {

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


    return (
        <>

            <div className="profileClass " style={{ "min-height": "100vh " }}>


                <h1 class="text-4xl sm:text-6xl lg:text-7xl text-center text-white tracking-wide m-5"><b>Your</b><span class="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text"> <b>Profile</b></span></h1>

                <div className="profileClass flex justify-evenly mt-16 ">
                    <div className="flex  justify-center text-center flex-col mt-11 md:text-2xl text-white" data-aos="fade-left">
                        <div className="mb-5  w-60 h-60 bg-black px-5 py-4 rounded-lg bg-glow-custom-2">
                            <h2 className="font-bold px-2 py-2 text-orange-600" data-aos="fade-up">Wallet Address</h2>
                            <h2 className="text-lg max-w-2 px-2 py-2 text-white" data-aos="zoom-in">
                                {address !== "0x" ? "" : ""} {address !== "0x" ? (address.substring(0, 15) + '...') : ""}
                            </h2>

                        </div>
                    </div>

                    <div className="flex  justify-center text-center flex-col mt-11 md:text-2xl text-white" data-aos="fade-left">
                        <div className="mb-5 pb-10 w-60 h-60 bg-black px-5 py-4 rounded-lg bg-glow-custom-2">
                            <h2 className="font-bold pb-10 px-2 py-2 text-orange-600" data-aos="fade-up">No. of NFTs</h2>
                            <h2 className=" font-bold px-2 pb-10 py-2 md:text-2xl text-white" data-aos="zoom-in" >{data.length} </h2>

                        </div>
                    </div>
                    <div className="flex  justify-center text-center flex-col mt-11 md:text-2xl text-white" data-aos="fade-left">
                        <div className="mb-5  w-60 h-60 bg-black px-5 py-4 rounded-lg bg-glow-custom-2">
                            <h2 className="font-bold md:text-2xl px-2 py-2 text-orange-600 " data-aos="fade-up">Total Value</h2>
                            <h2 className="font-bold md:text-2xl px-2 py-2 text-white  " data-aos="zoom-in" >{totalPrice} ETH</h2>

                        </div>
                    </div>

                </div>
                <div className="profileClass flex justify-evenly" data-aos="fade-up">
                    <div className="flex justify-center flex-col mt-11 mb-5 px-5 py-4 rounded-lg">
                        <h2 className="font-bold text-center md:text-4xl px-4 py-2 mx-auto text-orange-600 mb-4 border-b-4 border-b-white mb-12">Your NFTs</h2>


                        <div className="flex justify-evenly flex-wrap max-w-screen-xl" data-aos="fade-down">
                            {data.map((value, index) => {
                                return <NFTTile data={value} key={index} data-aos="zoom-in"></NFTTile>;
                            })}

                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-10 text-xl">
                {data.length == 0 ? "Oops, No NFT data to display (Are you logged in?)" : ""}
            </div>


        </>
    )
};