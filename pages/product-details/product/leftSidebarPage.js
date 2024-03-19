import React, { useState, useEffect, useRef } from "react";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ImageZoom from "../common/image-zoom";
// import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";
import { Container, Row, Col, Media } from "reactstrap";
import productsData from "../../../data/DataMock/products";
import { get_products } from "../../../apis/get";
import DetailsWithPrice from "../common/detail-price";

const LeftSidebarPage = ({ pathId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  console.log(data, "1111111111111");

  const getData = async () => {
    setLoading(true);
    const productsAPI = await get_products();
    if (productsAPI) {
      const getData = (productsAPI || []).find((r) => {
        const nameProps = r?.name?.split(" ").join("");
        const check = `${r?.id}` + "-" + `${nameProps}`;
        return check === pathId;
      });
      setData({ product: getData });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };

  var productsnav = {
    dots: false,
    infinite: data?.product?.type?.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    focusOnSelect: true,
    arrows: true,
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);

  const { nav1, nav2 } = state;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
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
                {!data ||
                !data.product ||
                data.product.length === 0 ||
                loading ? (
                  "loading"
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      <Slider
                        {...products}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick"
                      >
                        {data?.product?.images?.map((vari, index) => (
                          <div key={`${vari?.id}-${index}`}>
                            <ImageZoom image={vari} />
                          </div>
                        ))}
                      </Slider>
                      <Slider
                        className="slider-nav"
                        {...productsnav}
                        asNavFor={nav1}
                        ref={(slider) => (slider2.current = slider)}
                      >
                        {data?.product?.images
                          ? data.product.images.map((vari, index) => (
                              <div key={`${vari?.id}-${index}`}>
                                <Media
                                  src={`${vari.url}`}
                                  key={`${vari?.id}-${index}`}
                                  alt={vari.alt}
                                  className="img-fluid"
                                  style={{
                                    maxWidth: 80,
                                    minHeight: 100,
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            ))
                          : null}
                      </Slider>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        item={data.product}
                        changeColorVar={changeColorVar}
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
