import * as React from "react";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Header from "../components/header";
import BreadCrumbs from "../components/BreadCrumbs";
import { stagingBaseUrl, slugify, conversionDetailsDirection, conversionDetailsPhone,  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie } from "../constants";
  // import bannerImage from "../images/app-bg.png";
  // import favicon from "../images/favicon-live.png";
  // import Logo from "../images/logo.svg";
  import { JsonLd } from "react-schemaorg";
  import "../main.css";
  import { Link } from "@yext/pages/components";
  import { svgIcons } from "../svgIcon";
  import getDirectionUrl from "../getDirection";
  import {
    AnalyticsProvider,
    AnalyticsScopeProvider,
  } from "@yext/pages/components";
  import {
    Template,
    GetPath,
    GetRedirects,
    TemplateConfig,
    TemplateProps,
    TemplateRenderProps,
    GetHeadConfig,
    HeadConfig,
  } from "@yext/pages";
  
  var currentUrl = "";
  export const config: TemplateConfig = {
    stream: {
      $id: "city",
      filter: {
        savedFilterIds: ["dm_pizza-directory_address_city"],
      },
      fields: [
        "id",
        "uid",
        "meta",
        "name",
        "pizza_addressCountryDisplayName",
        "slug",
        "dm_directoryParents.name",
        "dm_directoryParents.slug",
        "dm_directoryParents.meta.entityType",
        "dm_directoryChildren.name",
        "dm_directoryChildren.slug",
        "dm_directoryChildren.dm_directoryChildrenCount",
        "dm_directoryChildren.address",
        "dm_directoryChildren.googlePlaceId",
        "dm_directoryChildren.hours",
        "dm_directoryChildren.mainPhone",
        // "dm_directoryChildren.what3WordsAddress",
        "dm_directoryChildren.yextDisplayCoordinate",
        "dm_directoryChildren.id"
        //seo section
        // "c_canonical",
        // "c_metaDescription",
        // "c_metaTitle",
      ],
      localization: {
        locales: ["en"],
        primary: false,
      },
    },
  };
  
  export const getPath: GetPath<TemplateProps> = ({ document }) => {
    return document.slug + ".html";
  };
  
  // export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  //   document,
  // }): HeadConfig => {
  //   let metaDescription = document.c_metaDescription
  //   ? document.c_metaDescription
  //   : "Visit your Favorite Restaurant in "+document.name+" for Britain's Tastiest Chicken. Find our menu, order delivery, timings here.";
  //   let metaTitle = document.c_metaTitle
  //   ? document.c_metaTitle
  //   : "Find Favorite Restaurant in "+document.name+" | Britain's Tastiest Chicken!";
    
  //   return {
  //     title: metaTitle,
  //     charset: "UTF-8",
  //     viewport: "width=device-width, initial-scale=1",
  //     tags: [
  //       {
  //         type: "link",
  //         attributes: {
  //           rel: "icon",
  //           type: "image/x-icon",
  //           href: favicon,
  //         },
  //       },
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "description",
  //           content: `${metaDescription}`,
  //         },
  //       },
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "author",
  //           content: "FAVORITE CHICKEN & RIBS",
  //         },
  //       },
        
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "robots",
  //           content: "noindex, nofollow",
  //         },
  //       },
        
  //       {
  //         type: "link",
  //         attributes: {
  //           rel: "canonical",
  //           href: ` ${
  //             document.c_canonical
  //             ? document.c_canonical
  //             : `${stagingBaseUrl}/${document.slug.toString()}.html`
  //           }`,
  //         },
  //       },
  //       ///og tags
        
  //       {
  //         type: "meta",
  //         attributes: {
  //           property: "og:url",
  //           content: `${stagingBaseUrl}/${document.slug.toString()}.html`,
  //         },
  //       },
        
  //       {
  //         type: "meta",
  //         attributes: {
  //           property: "og:description",
  //           content: `${metaDescription}`,
  //         },
  //       },
  //       {
  //         type: "meta",
  //         attributes: {
  //           property: "og:title",
  //           content: `${metaTitle}`,
  //         },
  //       },
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "og:image",
  //           content: `${Logo}`,
  //         },
  //       },
        
  //       /// twitter tag
        
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "twitter:image",
  //           content: `${Logo}`,
  //         },
  //       },
        
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "twitter:card",
  //           content: "summary",
  //         },
  //       },
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "twitter:url",
  //           content: `${stagingBaseUrl}/${document.slug.toString()}.html`,
  //         },
  //       },
        
  //       {
  //         type: "meta",
  //         attributes: {
  //           name: "twitter:description",
  //           content: `${metaDescription}`,
  //         },
  //       },
  //     ],
  //   };
  // };
  
  const City: Template<TemplateRenderProps> = ({
    relativePrefixToRoot,
    path,
    document,
    __meta
  }) => {
    const {
      name,
      dm_directoryParents,
      dm_directoryChildren,
      c_canonical,
      c_metaDescription,
      c_metaTitle,
      _site,
    } = document;
    
    let templateData = { document: document, __meta: __meta };
    
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    
    const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren.map((entity: any) => {
      var origin: any = null;
      if (entity.address.city) {
        origin = entity.address.city;
      } else if (entity.address.region) {
        origin = entity.address.region;
      } else {
        origin = entity.address.country;
      }
      
      let url = "";      
      if (!entity.slug) {
        let slugString = entity.id;    
        let slug = slugify(slugString);  
        // console.log('slug', slug); 
        url = `${slug}.html`;       
      } else {
        url = `${entity.slug?.toString()}.html`;
      }
      
      // const what3WordsAddressString = entity.what3WordsAddress ? (
      //   <div className="store-phone w3w">
      //   {svgIcons.what3Words}{" "}
      //   <Link target="_blank" href={entity.what3WordsAddress? `https://what3words.com/${entity.what3WordsAddress} `: ""} rel="noopener noreferrer" eventName={`what3WordsLinks`} >What3Words</Link>
      //   </div>
      //   ) : (
      //     ""
      //     );
          
          return (
            <div className="w-full sm:w-1/2 xl:w-1/3 px-[15px]">
            <div className="near-location">
            <h4>
            <a key={entity.slug} href={`${stagingBaseUrl}/${url}`}>
            {entity?.name}
            </a>
            </h4>
            <div className="store-address">
            {svgIcons.addressPin}
            <p>
            {entity.address.line1 ? entity.address.line1 : ""},{" "}
            {entity.address.line2 ? entity.address.line2 : ""}
            <br /> {entity.address.city ? entity.address.city : ""},{" "}
            {entity.address.postalCode ? entity.address.postalCode : ""},{" "}
            <br />
            {entity.address.countryCode
              ? regionNames.of(entity.address.countryCode)
              : ""}{" "}
              <br />
              </p>
              </div>
              {/* {what3WordsAddressString} */}
              {entity.mainPhone ? (
                <>
                <div className="store-phone">
                {svgIcons.phoneIcon}
                <p>                    
                <Link href={`tel:${entity.mainPhone}`} rel="noopener noreferrer" eventName={`phone`} >{entity.mainPhone}</Link>
                </p>
                </div>
                </>
                ) : (
                  <></>
                  )}
                  
                  <div className="store-link">              
                  <Link
                  data-ya-track="directions"
                  className="direction"
                  onClick={() => {
                    getDirectionUrl(entity);
                  }}
                  href="javascript:void(0);"
                  rel="noopener noreferrer"
                  eventName={`getdirections"`}
                  conversionDetails={conversionDetailsDirection}
                  >
                  {svgIcons.getDirection}{" "}Get Directions
                  </Link>              
                  <Link className="view-details" href={`${stagingBaseUrl}/${url}`} rel="noopener noreferrer" eventName={`storeViewDetails`} >
                  {svgIcons.viewDetails}{" "}
                  View Details
                  </Link>
                  </div>
                  </div>
                  </div>
                  );
                });
                
                let breadcrumbScheme: any = [];
                let currentIndex: any = 0;
                dm_directoryParents &&
                dm_directoryParents.map((i: any, index: any) => {
                  currentIndex = index;
                  if (index != 0) {
                    breadcrumbScheme.push({
                      "@type": "ListItem",
                      position: index,
                      item: {
                        "@id": `${stagingBaseUrl}/${i.slug}`,
                        name: i?.name,
                      },
                    });
                  }
                });
                
                breadcrumbScheme.push({
                  "@type": "ListItem",
                  position: currentIndex + 1,
                  item: {
                    "@id": `${stagingBaseUrl}/${document.slug?.toString()}.html`,
                    name: document?.name,
                  },
                });
                
                return (
                  <>
                  {/* <JsonLd<Organization>
                  item={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "Favorite Fried Chicken Limited",
                    url: "https://favorite.co.uk/",
                    logo: "https://favorite.co.uk/assets/img/logo-social.png",
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: "7 Davy Road",
                      addressLocality: "Clacton-on-Sea",
                      addressRegion: "Essex",
                      postalCode: "CO15 4XD",
                      addressCountry: "United Kingdom",
                    },
                    contactPoint: {
                      "@type": "ContactPoint",
                      contactType: "contact",
                      telephone: "01255 222568",
                    },
                    sameAs: [
                      "https://www.facebook.com/FavoriteChicken",
                      "https://www.instagram.com/favoritechickenribs",
                      "https://twitter.com/FavoriteChicken",
                    ],
                  }}
                  /> */}
                  {/* <JsonLd<BreadcrumbList>
                  item={{
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    
                    itemListElement: breadcrumbScheme,
                  }}
                  /> */}
                  <AnalyticsProvider
                  templateData={templateData}
                  enableDebugging={AnalyticsEnableDebugging} 
                  enableTrackingCookie={AnalyticsEnableTrackingCookie}
                  >
                  {" "}
                  <AnalyticsScopeProvider name={"header"}>
                    <Header></Header>
                  {/* <Header
                  data={_site.c_headerLinks1}
                  facebookPageUrl={_site.facebookPageUrl}
                  instagramHandle={_site.instagramHandle}
                  twitterHandle={_site.twitterHandle}
                  c_tikTok={_site.c_tikTok}
                  appStore={_site.c_appStore}
                  playStore={_site.c_playStore}
                  />   */}
                  <BreadCrumbs
                  name={name}
                  parents={dm_directoryParents}
                  address={""}        
                  ></BreadCrumbs>
                  {/* <Banner
                  Name={document.dm_directoryParents ? document.dm_directoryParents : []}
                  TagLine={""}
                  BackgroundImage={
                    document._site.c_directoryManagerBannerImage.url
                    ? document._site.c_directoryManagerBannerImage.url
                    : bannerImage
                  }
                  CtaButton={""}
                  text={name ? name : ""}
                  template={"city"}
                  /> */}
                  <h3 className="sec_heading mt-12" style={{ textAlign: "center" }}>
                  Available Stores in {name},{" "}
                  {document.dm_directoryParents[2]?.name
                    ? document.dm_directoryParents[2]?.name
                    : ""}
                    , {document.dm_directoryParents[1]?.name}{" "}
                    </h3>
                    <div className="directory-country nearby-sec">
                    <div className="container">
                    <div className="flex  flex-wrap justify-center -mx-[15px]">
                    {childrenDivs}
                    </div>
                    </div>
                    </div>
                    <Footer></Footer>
                    {/* <Footer
                    data={document._site.c_footerLinks}
                    address={document._site.address}
                    c_companyrn={document._site.c_companyrn}
                    c_phoneNumber={document._site.c_phoneNumber}
                    facebookPageUrl={document._site.facebookPageUrl}
                    instagramHandle={document._site.instagramHandle}
                    twitterHandle={document._site.twitterHandle}
                    c_tikTok={document._site.c_tikTok}
                    /> */}
                    </AnalyticsScopeProvider>
                    </AnalyticsProvider>
                    </>
                    );
                  };
                  export default City;
                  