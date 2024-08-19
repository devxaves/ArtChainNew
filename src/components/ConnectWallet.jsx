import React, { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

import img1 from "../assets/Scrolling/1.png";
import img2 from "../assets/Scrolling/2.png";
import img3 from "../assets/Scrolling/3.png";
import img4 from "../assets/Scrolling/4.png";
import img5 from "../assets/Scrolling/5.png";
import img6 from "../assets/Scrolling/6.png";
import img7 from "../assets/Scrolling/7.png";
import img8 from "../assets/Scrolling/8.png";
import img9 from "../assets/Scrolling/9.png";
import img10 from "../assets/Scrolling/10.png";
import img11 from "../assets/Scrolling/11.png";
import img12 from "../assets/Scrolling/12.png";


import FeatureSection from "./FeatureSection";
import Workflow from "./Workflow";
import Testimonials from "./Testimonials";

function CompanyMarquee() {
  const row1 = [img1, img2, img3, img4, img5, img6];
  const row2 = [img7, img8, img9, img10, img11, img12];

  return (
    <Wrapper>
      <Marquee>
        <MarqueeGroup>
          {row1.map((el, index) => (
            <ImageGroup key={index}>
              <Image src={el} />
            </ImageGroup>
          ))}
        </MarqueeGroup>
        <MarqueeGroup>
          {row1.map((el, index) => (
            <ImageGroup key={index}>
              <Image src={el} />
            </ImageGroup>
          ))}
        </MarqueeGroup>
      </Marquee>
      <Marquee>
        <MarqueeGroup2>
          {row2.map((el, index) => (
            <ImageGroup key={index}>
              <Image src={el} />
            </ImageGroup>
          ))}
        </MarqueeGroup2>
        <MarqueeGroup2>
          {row2.map((el, index) => (
            <ImageGroup key={index}>
              <Image src={el} />
            </ImageGroup>
          ))}
        </MarqueeGroup2>
      </Marquee>
    </Wrapper>
  );
}

function ConnectWallet(props) {
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <>   
      <div className="flex flex-col items-center mt-6 lg:mt-20 text-white">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          <b>Art</b>
          <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
            {" "}
            <b>Chain</b>
          </span>
        </h1>
        <p className="mt-10 text-3xl text-center text-white max-w-4xl">
          Reviving India's Ancient Art and Textile Heritage
        </p>

        <div className="flex justify-center my-10">
  <a
    href="#"
    className="WhiteNoUnderLink py-3 px-4 mx-3 rounded-md border hover:bg-gray-900 hover:border-orange-500 duration-300"
  >
    Get Original & Verified Artworks
  </a>
</div>


        <div className="flex mt-10 justify-center" data-aos="fade-up">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4 mr-10"
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4 ml-10"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl text-center tracking-wide">
          <span className="explor1 bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
            <b>Explore</b>
          </span>
        </h1>
      </div>

      <CompanyMarquee />

      <div className="max-w-7xl mx-auto pt-10 px-6">
        <FeatureSection />
        <Workflow />
        <Testimonials />
      </div>
    </>
  );
}

export default ConnectWallet;

// Styled components for CompanyMarquee
const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 0px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 20px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  width: 1400px;
  overflow: hidden;
  user-select: none;
  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;

const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(15rem, 1rem + 50vmin, 40rem); // Further increased size
  // padding: calc(clamp(15rem, 1rem + 40vmin, 40rem) / 40);
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  // border-radius: 0.5rem;
  margin-bottom:-25px;
  aspect-ratio: 14/12;
  padding: 0px 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
