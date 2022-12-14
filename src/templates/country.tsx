import * as React from "react";
// import Header from "../../src/components/layouts/footer";
// import Header from "../../src/components/layouts/header";
// import Footer from "../components/layouts/footer";
// import favicon from "../images/favicon.png";
import { Link   ,
  AnalyticsProvider,
  AnalyticsScopeProvider } from "@yext/pages/components";
// import Banner from "../components/banner";
import BreadCrumbs from "../components/BreadCrumbs";
import "../main.css";
import { JsonLd } from "react-schemaorg";
import {  stagingBaseUrl} from "../constants";
// import "../main.css";

// import bannerImage from "../images/app-bg.png";
// import favicon from "../images/favicon-live.png";

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
// import { stagingBaseUrl } from "../constants";
//import Logo from "../images/logo.svg";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "pizza_country",
    filter: {
      savedFilterIds: ["dm_pizza-directory_address_countrycode"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType"
      // "c_globalData.c_headerLinks1",
      // "c_globalData.c_footerLinks",
      // "c_globalData.facebookPageUrl",
      // "c_globalData.twitterHandle",
      // "c_globalData.instagramHandle",
      // "c_globalData.address",
      // "c_globalData.c_phoneNumber",
      // "c_globalData.c_companyrn",
      // "c_globalData.c_tikTok",
      //seo section
      // "c_canonical",
      // "c_metaDescription",
      // "c_metaTitle"
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  currentUrl = "/" + document.slug.toString() + ".html";
  return "/" + document.slug.toString() + ".html";
  // return "index.html";
};
// export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
//   relativePrefixToRoot,
//   path,
//   document,
// }): HeadConfig => {

//   let metaDescription = document.c_metaDescription ? document.c_metaDescription : "Buy office supplies in the UK for your business, office, school, or small business. Our range has everything from stationery to furniture at great prices with a service you can trust. "+'|'+document.name;
//   let metaTitle = document.c_metaTitle ? document.c_metaTitle : "Ryman Business® UK | Office Supplies | Businesses, Offices, & Schools"+document.name;

//   return {
//     title:  document.c_metaTitle ? document.c_metaTitle : "Ryman Business® UK | Office Supplies | Businesses, Offices, & Schools" +'|'+document.name,
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
//           name: "title",
//           content: `${metaTitle}`,
//         },
//       },
//       {
//         type: "meta",
//         attributes: {
//           name: "author",
//           content: "Ryman Business® UK | Office Supplies | Businesses, Offices, & Schools",
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
//               ? document.c_canonical
//               : `${stagingBaseUrl}${currentUrl}`
//           }`,
//         },
//       },
//       ///og tags

//       {
//         type: "meta",
//         attributes: {
//           property: "og:url",
//           content: stagingBaseUrl + currentUrl,
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
//       // {
//       //   type: "meta",
//       //   attributes: {
//       //     name: "og:image",
//       //     content: `${Logo}`
//       //   },
//       // },

//       /// twitter tag

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
//           content: stagingBaseUrl + currentUrl,
//         },
//       },
//       // {
//       //   type: "meta",
//       //   attributes: {
//       //     name: "twitter:image",
//       //     content: `${Logo}`
//       //   },
//       // },
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

const Country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { description, dm_directoryChildren, dm_directoryParents, c_tagline } =
    document;

  const {
    name,
    c_globalData,
    _site,
    c_canonical,
    c_metaDescription,
    c_metaTitle,
    c_banner,
    c_bannerimage,
    __meta
  } = document;
  let templateData = { document: document, __meta: __meta };
  const childrenDivs = dm_directoryChildren.map((entity: any) => (

    <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
      <Link
        key={entity.slug}
        href={"/"+"gb"+"/" + entity.slug + ".html"}
        className="hover:text-red" rel="noopener noreferrer" eventName={`name`}>
        {entity.name} ({entity.dm_directoryChildrenCount})
      </Link>
    </div>

  ));


  // let breadcrumbScheme = [];

  // breadcrumbScheme.push({
  //   "@type": "ListItem",
  //   position: 1,
  //   item: {
  //     "@id": `${stagingBaseUrl}/${document.slug.toString()}.html`,
  //     name: document.name,
  //   },
  // });


  return (
    <>
 {/* <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ryman",
          url: "https://www.rymanbusiness.com/",
          logo: "https://eu.evocdn.io/dealer/1411/content/media/My_Theme/ry-foot-logo.png",
          address: {
            "@type": "PostalAddress",
            // streetAddress: address.line1,
            // addressLocality: address.city,
            // addressRegion: address.region,
            // postalCode: address.postalCode,
            addressCountry: "United Kingdom",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "contact",
            telephone: "0333 103 0933",
            email: "https://www.rymanbusiness.com/contact-us"
          },
          sameAs: [
            "https://www.facebook.com/rymanbusiness/",
            "https://twitter.com/RymanBusiness",
            "https://www.linkedin.com/company/rymanbusiness",
            "https://www.instagram.com/rymanbusiness/"
           
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
    {/* <Header></Header> */}
   <BreadCrumbs
     name={name}
     parents={dm_directoryParents}
     baseUrl={relativePrefixToRoot}
     address={{}}
   ></BreadCrumbs>
   {/* <Banner
          Name={name}
          TagLine={c_tagline}
          BackgroundImage={
            c_backgroundImage ? c_backgroundImage.url : bannerImage
          }
          CtaButton={c_cTAButton}
          template={"location"}
        /> */}

   <h1 className="sec_heading mt-12" style={{ textAlign: "center" }}>
     All Regions of {name}{" "}
   </h1>
   <div className="directory-country py-5 lg:py-[60px]">
     <div className="container">
       <div className="flex flex-wrap justify-center -mx-4">
         {childrenDivs}
       </div>
     </div>
   </div>
   {/* <Footer></Footer> */}
   {/* <Footer
     data={c_globalData[0].c_footerLinks}
     address={c_globalData[0].address}
     c_companyrn={c_globalData[0].c_companyrn}
     c_phoneNumber={c_globalData[0].c_phoneNumber}
     facebookPageUrl={c_globalData[0].facebookPageUrl}
     instagramHandle={c_globalData[0].instagramHandle}
     twitterHandle={c_globalData[0].twitterHandle}
     c_tikTok={c_globalData[0].c_tikTok}
   /> */}
 </>
  );
};

export default Country;
