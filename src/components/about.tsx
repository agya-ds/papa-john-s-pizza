import * as React from "react";
import { Link, useAnalytics } from "@yext/pages/components";
// import abbanner from "../../images/ab-banner.jpg"
// import dt12 from "../../images/dtl2.jpg"
import PhotoSlider from "./PhotoSlider"

export default function About(props: any) {
  const { c_aboutData} = props;
  return ( 
    <>
            {c_aboutData?.title && c_aboutData?.description ? (
              <div  className=" py-10">
                
                <div className="container mx-auto ab-secmain flex flex-wrap items-center">
                  <div className="w-full md:w-1/2 px-5">
                    {c_aboutData?.photoGallery && c_aboutData.photoGallery?.map((p:any)=>{
                      return(
                       <img src={p.url}/>
                      )
                    })}
                  </div>
                  <div className="w-full md:w-1/2 about-sec px-5">
                    <h3 className="font-bold text-2xl ">{c_aboutData.title}</h3>
                    <p> {c_aboutData.description}</p>
                    <div className="cta_btn">
              <Link
                style={{ backgroundColor: "#ab131b", color: "white" }}
                className="button ml-48 mt-8"
                href="#"
                rel="noopener noreferrer"
                eventName={`ReadMore`}
              >
                {" "}
                 Read More
              </Link>
            </div>
                  </div>
             
                </div>
              </div>

            ) : ""}
         
     </>
  )
}