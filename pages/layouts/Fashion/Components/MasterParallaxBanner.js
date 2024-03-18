import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

const MasterParallaxBanner = ({
  parallaxSectionClass,
  bg,
  parallaxClass,
  title,
  subTitle1,
  subTitle2,
}) => {
  return (
    <Fragment>
      <section className={`p-0 ${parallaxSectionClass}`}>
        <div
          className={`full-banner ${bg} parallax ${parallaxClass}`}
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/web-store-project-e9a0f.appspot.com/o/banner%2F53263267-f7ab-45f4-bbc4-5e368e074c30?alt=media&token=d841b724-74d4-4770-992a-0d9062a7da6f")`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "repeat-x",
          }}
        >
          {/* <Container>
            <Row>
              <Col>
                <div className="banner-contain">
                  <h2>{title}</h2>
                  <h3>{subTitle1}</h3>
                  <h4>{subTitle2}</h4>
                </div>
              </Col>
            </Row>
          </Container> */}
        </div>
      </section>
    </Fragment>
  );
};

export default MasterParallaxBanner;
