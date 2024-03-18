import React, { Fragment } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import MasterBanner from "./MasterBanner";
import { banner } from "../../../../data/DataMock/banner";

const Banner = () => {
  const Data = banner;

  return (
    <Fragment>
      <section className="p-0">
        <Slider className="slide-1 home-slider">
          {Data.map((data, i) => {
            return (
              <MasterBanner
                key={i}
                img={data.img}
                desc={data.desc}
                title={data.title}
                link={data.link}
                url={data?.url}
              />
            );
          })}
        </Slider>
      </section>
    </Fragment>
  );
};

export default Banner;
