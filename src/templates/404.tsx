import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import favicon from "../images/favicon-live.png";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";
import { stagingBaseUrl,  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie } from "../constants";

export const config: TemplateConfig = {
  stream: {
    $id: "not-found-page",
    fields: [],
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
    filter: {
      entityIds: ["ffc-footer"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  return {
    title: "Page Not Found",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
    ],
  };
};

const FourOhFour: Template<TemplateRenderProps> = ({ document }) => {
  const { _site, __meta } = document;
  let templateData = { document: document, __meta: __meta };

  return (
    <>
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging} 
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={"header"}>
      {/* <Header
        data={document._site.c_headerLinks1}
        facebookPageUrl={document._site.facebookPageUrl}
        instagramHandle={document._site.instagramHandle}
        twitterHandle={document._site.twitterHandle}
        c_tikTok={document._site.c_tikTok}
        appStore={document._site.c_appStore}
        playStore={document._site.c_playStore}
      /> */}
      <div className="container">
        <div className="four-sec">
          <h1 style={{ textAlign: "center" }}>
            {" "}
            <b>404 - Page Not Found</b>{" "}
          </h1>

          <p>
            Sorry, the page you requested could not be found or is no longer
            available.
          </p>
          <a className="btn-no" href="#">
            {" "}
            Click here to Return to Homepage
          </a>
        </div>
      </div>
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

export default FourOhFour;
