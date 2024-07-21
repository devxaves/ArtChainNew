import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GetIpfsUrlFromPinata } from '../utils';
import MarketplaceJSON from '../Marketplace.json';
import NFTTile from './NFTTile';
import ConnectWallet from './ConnectWallet';
import '../index.css';
import { uploadJSONToIPFS, uploadFileToIPFS } from '../pinata'; // Import IPFS functions

export default function Marketplace() {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchNFTs() {
            const ethers = require("ethers");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            let transaction = await contract.getAllNFTs();

            const items = await Promise.all(transaction.map(async i => {
                var tokenURI = await contract.tokenURI(i.tokenId);
                console.log("getting this tokenUri", tokenURI);
                tokenURI = GetIpfsUrlFromPinata(tokenURI);
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
                };
                return item;
            }));

            updateFetched(true);
            updateData(items);
        }

        if (!dataFetched) fetchNFTs();
    }, [dataFetched]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleJsonChange = (e) => {
        try {
            setJsonData(JSON.parse(e.target.value));
        } catch (error) {
            setMessage("Invalid JSON format");
        }
    };

    const handleUploadFile = async () => {
        if (file) {
            const response = await uploadFileToIPFS(file);
            if (response.success) {
                const ipfsUrl = GetIpfsUrlFromPinata(response.pinataURL);
                setMessage(`File uploaded: ${ipfsUrl}`);
            } else {
                setMessage(`Error: ${response.message}`);
            }
        } else {
            setMessage("No file selected");
        }
    };

    const handleUploadJson = async () => {
        const response = await uploadJSONToIPFS(jsonData);
        if (response.success) {
            const ipfsUrl = GetIpfsUrlFromPinata(response.pinataURL);
            setMessage(`JSON uploaded: ${ipfsUrl}`);
        } else {
            setMessage(`Error: ${response.message}`);
        }
    };

    return (
        <div>
            {dataFetched ? (
                <div className="flex flex-col place-items-center mt-10">
                    <p className="mt-10 text-4xl text-center text-white max-w-4xl p-4">
                        We're not here Just to Sell.
                    </p>
                    <h1 className="text-xl sm:text-2xl lg:text-4xl text-center tracking-wide text-white">
                        <b>We promote India's </b>
                        <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
                            <b>Age Old Heritage</b>
                        </span>
                    </h1>

                    <h2 className="font-bold w-max text-left md:text-4xl px-4 py-2 mx-12 text-orange-600 border-b-4 border-b-white my-8">
                        Explore Our NFTs
                    </h2>
                    <div className="flex justify-between flex-wrap max-w-screen-xl text-center mt-10">
                        {data.map((value, index) => (
                            <NFTTile data={value} key={index} />
                        ))}
                    </div>

                    {/* File and JSON Upload Interface */}
                    <div className="mt-10">
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUploadFile}>Upload File</button>
                        <br />
                        <textarea onChange={handleJsonChange} placeholder="Enter JSON data" />
                        <button onClick={handleUploadJson}>Upload JSON</button>
                        <br />
                        <p>{message}</p>
                    </div>
                </div>
            ) : (
                <ConnectWallet />
            )}
        </div>
    );
}
