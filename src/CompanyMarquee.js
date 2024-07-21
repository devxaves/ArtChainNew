import React from "react";
import styled, { keyframes, css } from "styled-components";

function CompanyMarquee() {
  const row1 = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
    // ... (rest of the row1 URLs)
  ];

  const row2 = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
    // ... (rest of the row2 URLs)
  ];

  return (
    <Wrapper>
      <Text>With Great Outcomes.</Text>
      <Note>Our customers have gotten offers from awesome companies.</Note>
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

// ... (rest of the styled components)

export default CompanyMarquee;