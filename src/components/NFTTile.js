import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const StyledNFTTile = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  margin: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: #2a2a2a;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  font-family : "Poppins" , san-serif ;

  &:hover {
  transition: 0.4s ease-in-out;
  box-shadow: 0 0 15px 5px rgba(239, 149, 40, 0.85);
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const NFTImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${StyledNFTTile}:hover & {
    transform: scale(1.1);
  }
`;

const NFTInfo = styled.div`
  width: 100%;
  text-align: center;
`;

const NFTName = styled.h3`
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 8px;
  transition: color 0.3s ease;

  ${StyledNFTTile}:hover & {
    color: #f0f0f0;
  }
`;

const NFTDescription = styled.p`
  color: #cccccc;
  font-size: 14px;
  transition: color 0.3s ease;

  ${StyledNFTTile}:hover & {
    color: #e0e0e0;
  }
`;

function NFTTile({ data }) {

   
  const newTo = {
    pathname: "/nftPage/" + data.tokenId
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.image);

  return (
    <StyledNFTTile to={newTo}>
      <ImageContainer>
        <NFTImage src={IPFSUrl} alt={data.name} crossOrigin="anonymous" />
      </ImageContainer>
      <NFTInfo>
        <NFTName>{data.name}</NFTName>
        <NFTDescription>{data.description}</NFTDescription>
      </NFTInfo>
    </StyledNFTTile>
  );
}

export default NFTTile;