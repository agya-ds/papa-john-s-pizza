import * as React from "react";
import Banner from "../components/banner";
// import favicon from "../images/favicon.png";
// import Footer from "../components/layouts/footer";
// import Header from "../components/layouts/header";
import BreadCrumbs from "../components/BreadCrumbs";
import bannerImage from "../images/banner.png";
import { slugify} from "../constants"
import "../main.css";
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
import { stagingBaseUrl } from "../constants";
import { JsonLd } from "react-schemaorg";
import { Link   ,
  AnalyticsProvider,
  AnalyticsScopeProvider } from "@yext/pages/components";
  import {
    AnalyticsEnableDebugging,
    AnalyticsEnableTrackingCookie,
  } from "../constants";
export const config: TemplateConfig = {
  stream: {
    $id: "pizza_region",
    filter: {
      savedFilterIds: ["dm_pizza-directory_address_region"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.id",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};
var url: any = ""
var currentUrl = "";
export const getPath: GetPath<TemplateProps> = ({ document }) => {

  document.dm_directoryParents.map((i: any) => {

    if (i.meta.entityType.id == 'pizza_country') {
      url = `${i.slug}/${document.slug.toString()}.html`
    }
  })
  return url;
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
//               : `${stagingBaseUrl}/${url}`
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

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    description,
    c_globalData,
    dm_directoryParents,
    dm_directoryChildren,
    dreamsNew_addressRegionDisplayName,
    c_canonical,
    c_metaDescription,
    c_metaTitle,
    _site,
    __meta
  } = document;
  let templateData = { document: document, __meta: __meta };
  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  let slugString = "/";
  document.dm_directoryParents.forEach((e: any) => {
    slugString = e.slug + "/";
  });
  const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren.map((entity: any) => {
      let url: any = "";

      url = document.slug.toString();
      let url1: any = "";
      url1 = url.replace(/(\b\S.+\b)(?=.*\1)/g, "").trim();
      if (entity.dm_directoryChildrenCount == 1) {
        if (
          entity.dm_directoryChildren &&
          entity.dm_directoryChildren[0].slug
        ) {
          return (
            <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
              <a
                key={entity.slug}
                href={"/" + entity.dm_directoryChildren[0].slug + ".html"}
                className="hover:text-red"
              >
                {entity.name} ({entity.dm_directoryChildrenCount})
              </a>
            </div>
          );
        }
         else {
          let name: any = entity.dm_directoryChildren[0].name.toLowerCase();
          let string: any = name.toString();
          let removeSpecialCharacters = string.replace(
            /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
            ""
          );
          let result: any = removeSpecialCharacters.replaceAll("  ", "-");
          let finalString: any = result.replaceAll(" ", "-");
          url = `${entity.dm_directoryChildren[0].id}-${finalString}.html`;
          return (
            <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
              <Link key={entity.slug} href={"/" + url} className="hover:text-red" rel="noopener noreferrer" eventName={`name`}>
                {entity.name} ({entity.dm_directoryChildrenCount})
              </Link>
            </div>
          );
        }
      } 
      else {
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
            <Link
              key={entity.slug}
              href={"/" + entity.slug + ".html"}
              className="hover:text-red"
              rel="noopener noreferrer" eventName={`name`}
            >
              {entity.name} ({entity.dm_directoryChildrenCount})
            </Link>
          </div>
        );
      }
    });
  // let breadcrumbScheme: any = [];
  // let currentIndex: any = 0;
  // dm_directoryParents &&
  //   dm_directoryParents.map((i: any, index: any) => {
  //     currentIndex = index;
  //     if (index != 0) {
  //       breadcrumbScheme.push({
  //         "@type": "ListItem",
  //         position: index,
  //         item: {
  //           "@id": `${stagingBaseUrl}/${i.slug}`,
  //           name: i.name,
  //         },
  //       });
  //     }
  //   });
  // breadcrumbScheme.push({
  //   "@type": "ListItem",
  //   position: currentIndex + 1,
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
         <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
        {/* <Header ></Header> */}
      <BreadCrumbs
        name={name}
        parents={dm_directoryParents}
        baseUrl={relativePrefixToRoot}
        address={{}}
      ></BreadCrumbs>
      {/* <Banner
        Name={name}
        TagLine={c_banner.tagline}
        BackgroundImage={
          c_bannerimage ? c_bannerimage.url : bannerImage
        }
      /> */}
      <h1 className="sec_heading mt-12" style={{ textAlign: "center" }}>
        Cities in {name}, {document.dm_directoryParents[1].name}{" "}
      </h1>
      <div className="directory-country nearby-sec">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-[15px]">
            <div className="w-full text-center"></div>
            {childrenDivs}
          </div>
        </div>
      </div>

      {/* <Footer ></Footer> */}
               </AnalyticsScopeProvider>
          </AnalyticsProvider>
    </>
  );
};

export default State;