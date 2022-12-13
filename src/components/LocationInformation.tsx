import * as React from "react";
import Hours from "../components/hours";
import CustomMap from "../components/CustomMap";
// import favorite from "../images/favorite.svg";
// import justeats from "../images/justeats.svg";
// import uber_eats from "../images/uber-eats.svg";
// import deliveroo from "../images/deliveroo.svg";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../svgIcon";
import OpenCloseStatus from "../components/OpenCloseStatus";
import getDirectionUrl from "../getDirection";
import { conversionDetailsDirection, conversionDetailsPhone, defaultTimeZone } from "../constants";
type props = {
  prop: any;
  coords: any;
  address: any;
  phone: any;
  deliveryHours: any;
  c_cTAButton2: any;
  c_deliveryServicesJustEat: any;
  c_deliveryServicesUberEats: any;
  c_deliveryServicesDeliveroo: any;
  facebookPageUrl: any;
  instagramHandle: any;
  twitterHandle: any;
  // c_tikTok: any;
  what3WordsAddress: any;
  timezone: any;
  name: any;
  googlePlaceId: any;
};
var insta: Boolean = false;
var twitter: Boolean = false;
var tiktok: Boolean = false;
var facebook: Boolean = false;

const LocationInformation = (data: props) => {
  const [time, setTime] = React.useState({});
  const [delHours, setDelHours] = React.useState({});
  const [coordinates, setCoordinate] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const [address_str, serAddress_str] = React.useState("");
  const [withoutHourClass, setWithoutHourClass] = React.useState("");

  React.useEffect(() => {
    getString();
    setTime(data.prop);
    setCoordinate(data.coords);
    setDelHours(data.deliveryHours);

    setTimeZone(data.timezone);
    if (!data.prop) {
      setWithoutHourClass("withoutHours");
    }
    // insta = data.instagramHandle
    //   ? data.instagramHandle.includes("https://www.instagram.com")
    //   : "";
    // twitter = data.twitterHandle
    //   ? data.twitterHandle.includes("https://twitter.com")
    //   : "";
    // tiktok = data.c_tikTok
    //   ? data.c_tikTok
    //   : "".includes("https://www.tiktok.com");
    // facebook = data.facebookPageUrl
    //   ? data.facebookPageUrl.includes("https://www.facebook.com")
    //   : "";
  },
   []);

  function getString() {
    let address_string = "";
    address_string =
      data.address.line1 +
      "," +
      data.address.line2 +
      "," +
      data.address.city +
      "," +
      data.address.region +
      "," +
      data.address.postalCode +
      "," +
      regionNames.of(data.address.countryCode);

    address_string = address_string.replace("undefined,", "");
    serAddress_str(address_string);
  }

  const conversionDetails_direction = conversionDetailsDirection;
  const conversionDetails_phone = conversionDetailsPhone;

  let addressString = "";
  let addressLines = data.address?.line1 + ", " + data.address?.line2;

  if (addressLines.length > 42) {
    addressString += data.address?.line1 + ", <br />";
    let addressLine = data.address?.line2 + ", " + data.address?.city + ", ";
    if (addressLine.length > 42) {
      addressString +=
        data.address?.line2 + ", " + data.address?.city + ",<br />";
      addressString +=
        data.address?.postalCode +
        ", " +
        regionNames.of(data.address?.countryCode);
    } else {
      addressString +=
        data.address?.line2 +
        ", " +
        data.address?.city +
        ", " +
        data.address?.postalCode +
        ", <br />";
      addressString += regionNames.of(data.address?.countryCode);
    }
  } else {
    let line2 = "";
    if (data.address?.line2 != undefined) {
      line2 = data.address?.line2 + ", ";
    }
    addressString += data.address?.line1 + ", " + line2 + "<br />";
    addressString +=
      data.address?.city + ", " + data.address?.postalCode + ", <br />";
    addressString += regionNames.of(data.address?.countryCode);
  }

  // const what3WordsAddressString = data.what3WordsAddress ? (
  //   <div className="store-phone w3w">
  //     {svgIcons.what3Words}    
  //     <Link href={`https://what3words.com/${data.what3WordsAddress} `} target={data.what3WordsAddress == "#" ? "_self" : "_blank"} rel="noopener noreferrer" eventName={`what3WordsLink`} >What3Words</Link>
  //   </div>
  // ) : (
  //   ""
  // );

  return (
    <>
      <div className={`location-information ${withoutHourClass}`}>
        <div className="container">
          <div className="w-full text-center pb-4 lg:pb-5">
            <h2 className="store-time-status">
              {time ? (
                <OpenCloseStatus timezone={timezone ? timezone : defaultTimeZone } hours={time ? time : {}}></OpenCloseStatus>                
              ) : (
                <></>
              )}
            </h2>
          </div>

          <div className="boxes">
            <div className="location_details">
              <div className="box store-info">
                <div className="inner-box">
                  <h4>Store Info</h4>
                  <div className="store-address">
                    {svgIcons.addressPin}

                    <h2 dangerouslySetInnerHTML={{ __html: addressString }} />
                  </div>
                  {/* {what3WordsAddressString} */}
                  {data.phone ? (
                    <>
                      <div className="store-phone">
                        {svgIcons.phoneIcon}
                        <p>
                          <Link
                            data-ya-track="phone"
                            href={"tel:" + data.phone}
                            rel="noopener noreferrer"
                            eventName={`phone`}
                            conversionDetails={conversionDetails_phone}
                          >
                            {data.phone ? data.phone : ""}
                          </Link>
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="store-link">
                    <Link
                      data-ya-track="getdirections"
                      eventName={`getdirections`}
                      className="direction"
                      onClick={() => getDirectionUrl(data)}
                      href="javascript:void(0);"
                      rel="noopener noreferrer"
                      conversionDetails={conversionDetails_direction}
                    >
                      {svgIcons.getDirection} Get Directions
                    </Link>
                    {data.phone ? (
                      <>
                        <Link
                          className="call-store"
                          href={"tel:" + data.phone}
                          eventName={`phone`}
                          conversionDetails={conversionDetails_phone}
                          data-ya-track="phone"
                        >
                          {svgIcons.callstore} Call Store
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="available-on">
                    {data.c_cTAButton2 ? (
                      <>
                        {data.c_cTAButton2.link && data.c_cTAButton2.label ? (
                          <div className="available-option mb-4">
                            <h5>
                              {data.c_cTAButton2.label
                                ? data.c_cTAButton2.label
                                : ""}
                            </h5>

                            {/* <ul>
                              <li>                                  
                                <Link href={ data.c_cTAButton2.linkType == "PHONE" ? `tel:${data.c_cTAButton2.link}`: (data.c_cTAButton2.linkType == "EMAIL" ? `mailto:${data.c_cTAButton2.link}` : data.c_cTAButton2.link) } 
                                  target={data.c_cTAButton2.linkType == "PHONE" ? "_self":  (
                                    data.c_cTAButton2.linkType == "URL" ? "_self" : (data.c_cTAButton2.linkType == "OTHER" ? "_blank" : "_self")
                                    ) }
                                  rel="noopener noreferrer" eventName={`orderDirect`} >
                                    <img
                                    src={favorite}
                                    alt=""
                                    width="66"
                                    height="66"
                                    loading="lazy"
                                  />
                                  </Link>
                              </li>
                            </ul> */}
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    {/* {data.c_deliveryServicesUberEats ||
                    data.c_deliveryServicesDeliveroo ||
                    data.c_deliveryServicesJustEat ? (
                      <>
                        <div className="available-option">
                          <h5>Available to Order Here</h5>
                          <ul>
                            {data.c_deliveryServicesJustEat ? (
                              <>
                                <li>                                  
                                  <Link href={data.c_deliveryServicesJustEat} target="_blank" rel="noopener noreferrer" eventName={`deliveryServices`} >
                                    <img
                                      src={justeats}
                                      alt="Just Eats"
                                      width="66"
                                      height="66"
                                      loading="lazy"
                                    />
                                    </Link>
                                </li>
                              </>
                            ) : (
                              <></>
                            )}
                            {data.c_deliveryServicesUberEats ? (
                              <li>                                  
                                  <Link href={data.c_deliveryServicesUberEats} target="_blank" rel="noopener noreferrer" eventName={`deliveryServices`} >
                                    <img
                                      src={uber_eats}
                                      alt="Uber Eats"
                                      width="66"
                                      height="66"
                                      loading="lazy"
                                    />
                                    </Link>
                                </li>                             
                            ) : (
                              ""
                            )}
                            {data.c_deliveryServicesDeliveroo ? (
                            <li>                                  
                                  <Link href={data.c_deliveryServicesDeliveroo} target="_blank" rel="noopener noreferrer" eventName={`deliveryServices`} >
                                    <img
                                      src={deliveroo}
                                      alt="Deliveroo"
                                      width="66"
                                      height="66"
                                      loading="lazy"
                                    />
                                    </Link>
                                </li>                             
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      </>
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
              </div>
              {time || delHours ? (
                <>
                  <Hours
                    hours={time ? time : {}}
                    deliveryHours={delHours ? delHours : {}}
                    timezone={timezone ? timezone : {}}
                  />
                </>
              ) : (
                <></>
              )}

              {/* {data.facebookPageUrl ||
              data.instagramHandle ||
              data.twitterHandle ? (
                <>
                  <div className="box store-social">
                    <div className="inner-box">
                      <h4>Stay Connected With US :</h4>
                      <ul className="social-links">
                        {data.facebookPageUrl ? (
                          <li>                              
                              <Link target="_blank" href={facebook ? data.facebookPageUrl:  `https://www.facebook.com/${data.facebookPageUrl}` } rel="noopener noreferrer" eventName={`storeSocialLinks`} >{svgIcons.facebook}</Link>
                          </li>
                        ) : (
                          ""
                        )}
                        {data.instagramHandle ? (
                          <li>                              
                              <Link target="_blank" href={insta? `${data.instagramHandle}` : `https://www.instagram.com/${data.instagramHandle}`} rel="noopener noreferrer" eventName={`storeSocialLinks`} >{svgIcons.instagram}</Link>
                          </li>
                        ) : (
                         ""
                        )}
                        {data.twitterHandle ? (
                          <li>                              
                              <Link target="_blank" href={twitter? `${data.twitterHandle}`: `https://twitter.com/${data.twitterHandle}`} rel="noopener noreferrer" eventName={`storeSocialLinks`} >{svgIcons.twitter}</Link>
                          </li>                         
                        ) : (
                          ""
                        )}
                        {data.c_tikTok ? (
                           <li>                              
                              <Link target="_blank" href={tiktok ? `${data.c_tikTok}`: `https://www.tiktok.com/${data.c_tikTok}`} rel="noopener noreferrer" eventName={`headerMenuItem`} >{svgIcons.tiktok}</Link>
                            </li>                          
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )} */}
            </div>
            <div className="box map-info">
              <div className="inner-box">
                <CustomMap prop={coordinates} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LocationInformation;
