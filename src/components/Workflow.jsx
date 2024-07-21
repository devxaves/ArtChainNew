import { CheckCircle2 } from "lucide-react";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import { checklistItems1 } from "../constants";
import { checklistItems2 } from "../constants";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Workflow = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <>
    <div className="WhiteNoUnderLink">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-10 mb-10 tracking-wide">
        Why Buy our{" "}
        <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
          NFT minted Textile & Arts
        </span>
      </h2>
      <div className="flex flex-wrap justify-center pb-10 mb-32">
        <div
          className="p-2 w-full lg:w-1/2 z-10 pointer-events-none"
          data-aos="fade-up"
        >
          <img src={photo2} alt="Coding" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems2.map((item, index) => (
            <div key={index} className="flex mb-10" data-aos="fade-right">
              <div
                className="text-orange-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full"
                data-aos="fade-right"
              >
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-3xl">{item.title}</h5>
                <p className="text-lg text-orange-100">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


<div className="WhiteNoUnderLink">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-10 mb-10 tracking-wide">
        We Also Give{" "}
        <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
          Loyalty Rewards
        </span>
      </h2>
      <div className="flex flex-wrap justify-center pb-10 mb-32">
        <div
          className="p-2 w-full lg:w-1/2 z-10 pointer-events-none"
          data-aos="fade-up"
        >
          <img src={photo1} alt="Coding" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems1.map((item, index) => (
            <div key={index} className="flex mb-10" data-aos="fade-right">
              <div
                className="text-orange-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full"
                data-aos="fade-right"
              >
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-3xl">{item.title}</h5>
                <p className="text-lg text-orange-100">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </>
  );
};

export default Workflow;
