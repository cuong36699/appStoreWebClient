import React from "react";
import { useSelector } from "react-redux";
import MasterServiceContent from "../../../components/common/Service/MasterServiceConternt";

const Service = () => {
  const servicesAPI = useSelector((state) => state?.api?.servicesAPI);

  return (
    <div
      className="collection-filter-block"
      style={{ padding: "20px 20px 0px 20px" }}
    >
      <div className="product-service" style={{ padding: 0, margin: 0 }}>
        {(servicesAPI || []).map((data, index) => {
          return (
            <MasterServiceContent
              key={index}
              link={data.link}
              title={data.name}
              service={data.description}
              lastChild={data.lastChild}
              url={data?.image?.url}
              lastIndex={index === servicesAPI?.length - 1 ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Service;
