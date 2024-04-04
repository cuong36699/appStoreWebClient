import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import NewProduct from "../../shop/common/newProduct";
import ImageZoom from "../common/image-zoom";
import Service from "../common/service";
// import DetailsWithPrice from "../common/detail-price";
import { Col, Container, Media, Row } from "reactstrap";
import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";
import { getLocal } from "../../../helpers/Local";
import { useSelector } from "react-redux";

const LeftSidebarPage = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const productSelect = getLocal("product");

  const products = useSelector((state) => state?.common?.products);

  const getData = async () => {
    setLoading(true);
    const newData = (products || []).find((r) => r?.id === productSelect?.id);
    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [products, productSelect]);

  var productSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };

  var productsnav = {
    slidesToShow: 3,
    infinite: data?.type?.[activeTab]?.imagesList?.length > 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    speed: 300,
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [data]);

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter" id="filter">
              <Filter />
              <Service />
              {/* <!-- side-bar single product slider start --> */}
              <NewProduct />
              {/* <!-- side-bar single product slider end --> */}
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col xl="12" className="filter-col">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        filter
                      </span>
                    </div>
                  </Col>
                </Row>
                {!data || data.length === 0 || loading ? (
                  "loading"
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      <Slider
                        {...productSlider}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick"
                      >
                        {(data?.type?.[activeTab]?.imagesList || [])?.map(
                          (vari, index) => (
                            <div key={`${vari?.id}-${index}`}>
                              <img
                                src={`${vari.url}`}
                                alt={vari.url}
                                className="img-fluid image_zoom_cls-0"
                              />
                            </div>
                          )
                        )}
                      </Slider>
                      {/*  */}
                      <div
                        style={{
                          maxWidth: "calc(100% - 6px)",
                        }}
                      >
                        <Slider
                          className="slider-nav"
                          {...productsnav}
                          asNavFor={nav1}
                          ref={(slider) => (slider2.current = slider)}
                        >
                          {data?.type?.[activeTab]?.imagesList
                            ? (data?.type?.[activeTab]?.imagesList || [])?.map(
                                (vari, index) => (
                                  <div key={`${vari?.id}-${index}`}>
                                    <Media
                                      src={`${vari.url}`}
                                      key={`${vari?.id}-${index}`}
                                      alt={vari.alt}
                                      className="img-fluid"
                                    />
                                  </div>
                                )
                              )
                            : null}
                        </Slider>
                      </div>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        item={data}
                        setTab={(i) => {
                          setActiveTab(i);
                        }}
                      />
                    </Col>
                  </Row>
                )}
              </Container>
              {/* <ProductTab /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebarPage;
