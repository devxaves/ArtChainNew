import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { HomeNavItems, LandingNavItems } from "../constants";
import { useNavigate, Link } from "react-router-dom";
import '../index.css';

export default function Navbar(props) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const navigate = useNavigate();

  return (
    <nav className="navback sticky top-0 z-50 py-3 backdrop-blur-xl border-b border-neutral-700/80 ">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">ArtChain</span>
          </div>

          {props.isConnected ? (
            <ul className="hidden lg:flex ml-14 space-x-12">
              {HomeNavItems.map((item, index) => (
                <li key={index} id={item.id} className="underline-effect navigation-list-item">
                  <div
                    className="h-full px-3 py-2 cursor-pointer text-lg "
                    onClick={() => navigate(item.navigateLink)}
                  >
                    {item.label}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="hidden lg:flex ml-14 space-x-12">
              {LandingNavItems.map((item, index) => (
                <li key={index} className="underline-effect">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          )}
          <div className="hidden lg:flex justify-center space-x-12 items-center" id="AccountAddressbtn">
            {props.isConnected && (
              <Link to="/profile" state={{ address: props.address }}>
                <div className="buttons">
                  <button className="btn">
                    <span></span>
                    <p
                      data-start="Profile"
                      data-text={
                        props.address.slice(0, 5) +
                        "..." +
                        props.address.slice(props.address.length - 4, props.address.length)
                      }
                      data-title="Profile"
                    ></p>
                  </button>
                </div>
              </Link>
            )}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
