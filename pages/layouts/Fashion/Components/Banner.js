import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import MasterBanner from "./MasterBanner";
import { useSelector } from "react-redux";

const Banner = () => {
  const [data, setData] = useState([]);

  const bannerAPI = useSelector((state) => state?.api?.bannerAPI);

  useEffect(() => {
    if (bannerAPI) {
      const bannerActive = (bannerAPI || []).filter((r) => r?.status);
      setData(bannerActive);
    }
  }, [bannerAPI]);

  return (
    <Fragment>
      <section className="p-0">
        <Slider className="slide-1 home-slider">
          {(data || []).map((data, i) => {
            return (
              <MasterBanner
                key={i}
                img={"home"}
                desc={data?.description}
                title={data?.name}
                link={data?.link || ""}
                url={data?.image?.url}
              />
            );
          })}
        </Slider>
      </section>
    </Fragment>
  );
};

export default Banner;
