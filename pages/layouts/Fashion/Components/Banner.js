import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { get_banners } from "../../../../apis/get";
import MasterBanner from "./MasterBanner";

const Banner = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const bannerAPI = await get_banners();
    console.log(bannerAPI, "bannerAPI");
    setData(bannerAPI);
  };

  useEffect(() => {
    getData();
  }, []);

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
