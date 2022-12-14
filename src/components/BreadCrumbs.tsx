import { Link } from "@yext/pages/components";
import { svgIcons } from "../svgIcon";
import * as React from "react";
// import { regionNames } from "../../types/constants"
type data = {
  name: any;
  parents: any;
  baseUrl: any;
  address: any;
};
/**
* Use this component for Breadcrumb
* @param props 
* @returns HTML element
*/
const BreadCrumbs = (props: data) => {
  const [list, setList] = React.useState(null);
  var breadcrumbs;
  var data: any = [];
  React.useEffect(() => {
    setURL(props.parents, props.baseUrl);
  }, [setList]);
  const setURL = (parents: any, baseUrl: any) => {
    // console.log(parents, "parents")
    if (parents) {
      for (let i = 0; i < parents.length; i++) {
        if (parents[i].meta.entityType.id == "pizza_country") {
          parents[i].name = (parents[i].name);
          parents[i].slug = parents[i].slug;
          parents[i].count = parents[i].dm_directoryChildrenCount
          parents[i].entityType = 'pizza_country'
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
            count: parents[i].dm_directoryChildrenCount,
            entityType: parents[i].entityType
          });

        } else if (parents[i].meta.entityType.id == "pizza_region") {
          data.push({ name: parents[i].name, slug: `${parents[i - 1].slug}/${parents[i].slug}`, count: parents[i].dm_directoryChildrenCount, entityType: parents[i].entityType });
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i - 1].slug}/${parents[i].slug}`;
          parents[i].count = parents[i].dm_directoryChildrenCount
          parents[i].entityType = 'pizza_region'
        }
        else if (parents[i].meta.entityType.id == "pizza_city") {
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i - 1].slug}/${parents[i].slug}`;
          parents[i].count = parents[i].dm_directoryChildrenCount
          parents[i].entityType = 'pizza_city'
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
            count: parents[i].dm_directoryChildrenCount,
            entityType: parents[i].entityType

          });
        }
      }
      // console.log(data, 'data')
      breadcrumbs = data.map((crumb: any) => (
        <li key={crumb.slug}>
          {crumb.entityType == 'pizza_city' ? <>
            {crumb.count == 1 ? <>
              <li className="breadcrumbcity">
                {crumb.name}
              </li>
            </> : <>
              <Link rel="noopener noreferrer" eventName={`Breadcrumb`} href={baseUrl + crumb.slug + ".html"}>
                {crumb.name}
              </Link>
           </>
            }
          </> : <>
            <Link rel="noopener noreferrer" eventName={`Breadcrumb`}  href={baseUrl + crumb.slug + ".html"}>
              {crumb.name}
            </Link>
          </>
          }
      </li>
      ));
      setList(breadcrumbs);
    } else {
      setList(null);
    }
  };

  return (
    <div className="breadcrumb">
      <div className="container mx-auto">
        <ul>
          <li>
            <Link href="#" rel="noopener noreferrer" eventName={`Homepage`} >
            {svgIcons.homeIcon}
                      </Link>
          </li>
          {list ? (
            list
          ) : (
            <>
              {props.address && props.address.city ? (
                <li>
                  {" "}
                  <Link rel="noopener noreferrer" eventName={`address`} href={props.baseUrl + props.address.city}>
                    {props.address.city ? props.address.city : ""}
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </>
          )}
          <li>{props && props.name}</li>
        </ul>
      </div>
    </div>
  );
};
export default BreadCrumbs;