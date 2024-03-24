import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import BlogData from "../../../data/DataMock/blog";
import { Slider3 } from "../../../services/script";

const BlogSection = ({ type, sectionClass, title, inner, hrClass }) => {
  // 1000 x 591
  const [data, setData] = useState({});

  // var { data } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: type,
  //   },
  // });

  useEffect(() => {
    const getData = (BlogData || []).filter((r) => r?.type === type);
    setData({ blog: getData });
  }, [type]);

  return (
    <Fragment>
      <section className={sectionClass}>
        <Container>
          <Row>
            <Col md="12">
              <div className={title}>
                <h4>our collection</h4>
                <h2 className={inner}>special products</h2>
                {hrClass ? (
                  <hr role="tournament6"></hr>
                ) : (
                  <div className="line">
                    <span></span>
                  </div>
                )}
              </div>
              <Slider {...Slider3} className="slide-3 no-arrow ">
                {data &&
                  (data.blog || []).map((item, index) => (
                    <Col md="12" key={index}>
                      <Link href={`/blogs/blog_detail`}>
                        <div className="classic-effect">
                          <Media src={item.img} className="img-fluid" alt="" />
                          <span></span>
                        </div>
                      </Link>
                      <div className="blog-details">
                        <h4>{item.title}</h4>
                        <Link href={`/blogs/blog_detail`}>
                          <p>{item.desc} </p>
                        </Link>
                        <hr className="style1" />
                        <h6>by: {item.date}</h6>
                      </div>
                    </Col>
                  ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};
export default BlogSection;
