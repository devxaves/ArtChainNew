import { features } from "../constants";

import React, {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeatureSection = () => {
  useEffect(()=>{
    AOS.init({
      duration : 1500
    });
  });
  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-[700px] WhiteNoUnderLink">
      <div className="text-center">
    
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          India's Heritage{" "}
          <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
            Artforms and Textiles
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20" >
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-400 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl" data-aos="fade-down">{feature.text}</h5>
                <p className="text-md p-2 mb-20 text-orange-100" data-aos="fade-down">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
