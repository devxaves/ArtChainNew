import { Palette } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";
import { id } from "ethers/lib/utils";

export const LandingNavItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const HomeNavItems = [
  { label: "Home", navigateLink: "/" , id:"HomeNav"},
  { label: "Discover", navigateLink: "discover" ,id:"DiscoverNav" },
  { label: "Register Artist", navigateLink: "create_project" ,id:"CreateNav" },
];

export const testimonials = [
  {
    user: "Arka Mondal",
    company: "Stellar Solutions",
    image: user5,
    text: "The Idea is amazing. As an Indian it's our Duty to not let our old Culture and heritage die, and support the hard working Artists.",
  },
  {
    user: "Rekha Modi",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "Art Chain is truly a game-changing and innovative platform. I would like to thanks the creators for thinking about our Ancient Artforms.",
  },
  {
    user: "Bishal Seth",
    company: "Quantum Innovations",
    image: user3,
    text: "Taking these age old arts on blockchain will surely take them forward in this modern era and promote them.",
  },
  // {
  //   user: "Ronee Brown",
  //   company: "Fusion Dynamics",
  //   image: user4,
  //   text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  // },
  // {
  //   user: "Michael Wilson",
  //   company: "Visionary Creations",
  //   image: user5,
  //   text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  // },
  // {
  //   user: "Emily Davis",
  //   company: "Synergy Systems",
  //   image: user6,
  //   text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  // },
];

export const features = [
  {
    icon: <Palette />,
    text: "Madhubani Painting (Bihar)",
    description:
      "Traditional art form using natural dyes and pigments, characterized by intricate patterns and vibrant colors.",
  },
  {
    icon: <Palette />,
    text: "Chikankari Embroidery (UP)",
    description:
      "Delicate and intricate hand embroidery using white thread on fine fabrics like muslin, silk, and chiffon.",
  },
  {
    icon: <Palette />,
    text: "Pattachitra (Odisha & WB)",
    description:
      "Cloth-based scroll painting known for its intricate details and mythological narratives.",
  },
  {
    icon: <Palette />,
    text: "Kalamkari (Andhra Pradesh)",
    description:
      "Hand-painted or block-printed cotton textile, known for its detailed and intricate designs.",
  },
  {
    icon: <Palette />,
    text: "Kutch Embroidery (Gujarat)",
    description:
      "Vibrant and intricate embroidery with mirror work, practiced by the tribal communities of Kutch.",
  },
  {
    icon: <Palette />,
    text: "And Many More...",
    description:
      " ",
  },
];

export const checklistItems1 = [
  {
    title: "Silver card Loyalty Program",
    description:
      "Helps you get additional Features and Discounts upto 5%",
  },
  {
    title: "Gold card Loyalty Program",
    description:
      "Gives Silver Benefits and Discounts upto 10%",
  },
  {
    title: "Diamond Card Loyalty Program",
    description:
      "Eligible for Monthly Airdrops and All Benefits",
  },
];



export const checklistItems2 = [
  {
    title: "Original and Verified Products",
    description:
      "Get Original Textile or Artworks Delivered to your Doortstep without any Middlemen",
  },
  {
    title: "NFT as Proof of Ownership",
    description:
      "For every Product you Purchase you get an Unique NFT which is the Proof of Authencity, Transferred through Blockchain",
  },
  {
    title: "Real & Fast",
    description:
      "Our Blockchain Technology ensures every Transaction and Purchases made are transparent and Real from Artist to Customer",
  },
  // {
  //   title: "Share work in minutes",
  //   description:
  //     "Track the performance of your VR apps and gain insights into user behavior.",
  // },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  // { href: "#", text: "Tutorials" },
  // { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "NFT MarketPlace" },
  { href: "#", text: "Artist Donations" },
  // { href: "#", text: "Downloads" },
  // { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  // { href: "#", text: "Conferences" },
  // { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
