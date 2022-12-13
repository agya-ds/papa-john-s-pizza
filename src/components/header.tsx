import * as React from "react";
import { useEffect } from "react";
import Logo from "../images/logo.svg";
import appStore from "../images/play-store-icon.svg";
import googlePlay from "../images/app-store-icon.svg";
import "../main.css";
import { svgIcons } from "../svgIcon";
import { Link } from "@yext/pages/components";
type props = {
  data: any;
  facebookPageUrl: any;
  instagramHandle: any;
  twitterHandle: any;
  c_tikTok: any;
  appStore: any;
  playStore: any;
};

var insta: Boolean = false;
var twitter: Boolean = false;
var tiktok: Boolean = false;
var facebook: Boolean = false;

const Header = (headerItem: props) => {
  useEffect(() => {
    document.body.setAttribute("id", "body");

    let checkInsta = headerItem.instagramHandle
      ? headerItem.instagramHandle.includes("https://www.instagram.com")
      : "";

    insta = checkInsta;

    let checktwitter = headerItem.twitterHandle
      ? headerItem.twitterHandle.includes("https://twitter.com")
      : "";

    twitter = checktwitter;

    let checktiktok = headerItem.c_tikTok
      ? headerItem.c_tikTok
      : "".includes("https://www.tiktok.com");

    tiktok = checktiktok;

    let checkfacebook = headerItem.facebookPageUrl
      ? headerItem.facebookPageUrl.includes("https://www.facebook.com")
      : "";
    facebook = checkfacebook;
  });

  const toggle = () => {
    document.getElementById("body").classList.toggle("menu-opened");
  };

  return (
    <>
      <div className="site-header">
        <div className="header-top">
          <div className="container flex flex-row justify-between items-center">
            <div className="logo">              
              <Link href={"https://favorite.co.uk/"} rel="noopener noreferrer" eventName={`homeLogo`} >
              <img
                  src={Logo}
                  alt="Favorite Fried Chicken"
                  width="456"
                  height="98"
                />
              </Link>
            </div>
            <a
              href="#"
              className="store-locator-link"
              data-ya-track="storeLocator"
            >
              {svgIcons.addressPinHeader}
            </a>
            <button
              type="button"
              className="menu-btn"
              id="menu-btn"
              onClick={toggle}
              name="toggle-button"
            >
              <span></span>
            </button>

            <div className="app-link">
              {headerItem.playStore ? (
                <>                  
                  <Link target="_blank" href={headerItem.playStore} rel="noopener noreferrer" eventName={`googlePlay`} >
                    <img src={appStore} alt="Google Play" />{" "}
                    <span>
                      GET IT ON <b>Google Play</b>
                    </span>
                  </Link> 
                </>
              ) : (
                ""
              )}
              {headerItem.appStore ? (                         
                  <Link target="_blank" href={headerItem.appStore} rel="noopener noreferrer" eventName={`appStore`} >
                  <img src={googlePlay} alt="App Store" />{" "}
                    <span>
                      Download on the <b>App Store</b>
                    </span>
                  </Link>                
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <nav className="navigation">
          <div className="container flex flex-row justify-between">
            <ul id="main-nav" className="main-nav">
              {headerItem.data &&
                headerItem.data.map((e: any, index: any) => {
                  return (
                    <>
                      <li className="group relative" key={index.toString()}>
                        <a href="#" data-ya-track="headerItem">
                          {e.nav1}
                        </a>
                        <ul className="submenu">
                          {e.nav2.map((e: any, index: any) => {
                            return (
                              <li key={index.toString()}>                               
                                <Link href={e.link} rel="noopener noreferrer" eventName={`headerMenuItem`} >{e.label}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </>
                  );
                })}
            </ul>

            <ul className="social-links">
              {headerItem.facebookPageUrl ? (
                <li>                  
                  <Link target="_blank" href={headerItem.facebookPageUrl} rel="noopener noreferrer" eventName={`socialLinks`} >{svgIcons.facebook}</Link>
                </li>
              ) : (
                ""
              )}
              {headerItem.instagramHandle ? (
                <li>
                  <Link target="_blank" href={ insta? `/${headerItem.instagramHandle}`: `https://www.instagram.com/${headerItem.instagramHandle}`} rel="noopener noreferrer" eventName={`socialLinks`} >{svgIcons.instagram}</Link>
                </li>
              ) : (
                ""
              )}
              {headerItem.twitterHandle ? (
                <li>                  
                  <Link target="_blank" href={twitter? `/${headerItem.twitterHandle}`: `https://twitter.com/${headerItem.twitterHandle}`} rel="noopener noreferrer" eventName={`socialLinks`} >{svgIcons.twitter}</Link>
                </li>
              ) : (
                ""
              )}
              {headerItem.c_tikTok ? (
                <li>                  
                  <Link target="_blank" href={tiktok? `/${headerItem.c_tikTok}`: `https://www.tiktok.com/${headerItem.c_tikTok}`} rel="noopener noreferrer" eventName={`socialLinks`} >{svgIcons.tiktok}</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
