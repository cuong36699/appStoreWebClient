import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Collapse, Container, Row } from "reactstrap";
import LogoImage from "../../headers/common/logo";
import { useSelector } from "react-redux";

const MasterFooter = ({
  containerFluid,
  logoName,
  layoutClass,
  footerClass,
  footerLayOut,
  footerSection,
  belowSection,
  belowContainerFluid,
  CopyRightFluid,
  newLatter,
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const [data, setData] = useState([]);

  const aboutAPI = useSelector((state) => state?.api?.aboutAPI);

  const width = window.innerWidth < 750;

  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener("resize", changeCollapse);
    };
  }, []);

  useEffect(() => {
    if (aboutAPI) {
      setData(aboutAPI[0]);
    }
  }, [aboutAPI]);

  const handleClick = (data) => {
    if (data?.link) {
      window.open(data?.link);
    } else {
      const dataString = JSON.stringify(data);
      router.push({
        pathname: "/about",
        query: { data: dataString },
      });
    }
  };

  return (
    <div>
      <footer className={footerClass}>
        {newLatter ? (
          <div className={footerLayOut}>
            <Container fluid={containerFluid ? containerFluid : ""}>
              <section className={`${footerSection} footer-theme-logo`}>
                <div className="footer-contant">
                  <div className="footer-logo">
                    <LogoImage logo={logoName} />
                  </div>
                </div>
              </section>
            </Container>
          </div>
        ) : null}

        <section className={belowSection}>
          <Container fluid={belowContainerFluid ? belowContainerFluid : ""}>
            <Row className="footer-theme partition-f">
              {/* intro */}
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 1 ? "active" : ""
                    } `}
                    style={{ marginTop: width ? 20 : "" }}
                  >
                    <span
                      style={{ fontWeight: "600", fontSize: 14 }}
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(1);
                        } else setIsOpen(true);
                      }}
                    >
                      {data?.introduce?.name
                        ? data?.introduce?.name.toUpperCase()
                        : null}
                    </span>
                    <p>{data?.introduce?.description || ""}</p>
                    <span className="according-menu"></span>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul>
                        {(data?.introduce?.data || []).map((r, i) => (
                          <li key={i}>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => handleClick(r)}
                            >
                              {r?.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              {/* policy */}
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 2 ? "active" : ""
                    } `}
                  >
                    <span
                      style={{ fontWeight: "600", fontSize: 14 }}
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(2);
                        } else setIsOpen(true);
                      }}
                    >
                      {data?.policy?.name
                        ? data?.policy?.name.toUpperCase()
                        : null}
                    </span>
                    <span className="according-menu"></span>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul>
                        {(data?.policy?.data || []).map((r, i) => (
                          <li key={i}>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => handleClick(r)}
                            >
                              {r?.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              {/* about us */}
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 3 ? "active" : ""
                    } `}
                  >
                    <span
                      style={{ fontWeight: "600", fontSize: 14 }}
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(3);
                        } else setIsOpen(true);
                      }}
                    >
                      {data?.about?.name
                        ? data?.about?.name.toUpperCase()
                        : null}
                    </span>
                    <span className="according-menu"></span>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 3 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul>
                        {(data?.about?.data || []).map((r, i) => (
                          <li key={i}>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => handleClick(r)}
                            >
                              {r?.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              {/*  */}
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 4 ? "active" : ""
                    } `}
                  >
                    <span
                      style={{ fontWeight: "600", fontSize: 14 }}
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(4);
                        } else setIsOpen(true);
                      }}
                    >
                      {data?.social?.name
                        ? data?.social?.name.toUpperCase()
                        : "LIÊN HỆ"}
                    </span>
                    <span className="according-menu"></span>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 4 ? isOpen : false) : true}
                  >
                    <div className="footer-contant" style={{ paddingTop: 10 }}>
                      <div style={{ display: "flex", gap: 20 }}>
                        {(data?.social?.data || []).map((r, i) => (
                          <img
                            onClick={() => {
                              window.open(r?.link);
                            }}
                            key={i}
                            className="image-content"
                            alt={r?.image?.url}
                            src={r?.image?.url || "https://placehold.co/200"}
                            style={{ cursor: "pointer", width: 40, height: 40 }}
                          />
                        ))}
                      </div>
                    </div>
                  </Collapse>
                  {/*  */}
                  <div className="sub-title"></div>
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 5 ? "active" : ""
                    } `}
                    style={{ marginTop: width ? "" : 20 }}
                  >
                    <span
                      style={{ fontWeight: "600", fontSize: 14 }}
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(5);
                        } else setIsOpen(true);
                      }}
                    >
                      {data?.payment?.name
                        ? data?.payment?.name.toUpperCase()
                        : "PHƯƠNG THỨC THANH TOÁN"}
                    </span>
                    <span className="according-menu"></span>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 5 ? isOpen : false) : true}
                  >
                    <div className="footer-contant" style={{ paddingTop: 10 }}>
                      <div style={{ display: "flex", gap: 20 }}>
                        {(data?.payment?.data || []).map((r, i) => (
                          <img
                            key={i}
                            className="image-content"
                            alt={r?.image?.url}
                            src={r?.image?.url || "https://placehold.co/200"}
                            style={{ cursor: "pointer", width: 40, height: 40 }}
                          />
                        ))}
                      </div>
                    </div>
                  </Collapse>
                </div>
              </Col>
              {/*  */}
              <Col>
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 6 ? "active" : ""
                    } `}
                  >
                    <span
                      style={{ fontWeight: "600", fontSize: 14 }}
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(6);
                        } else setIsOpen(true);
                      }}
                    >
                      {data?.location?.name
                        ? data?.location?.name.toUpperCase()
                        : "VỊ TRÍ"}
                    </span>
                    <span className="according-menu"></span>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 6 ? isOpen : false) : true}
                  >
                    <div
                      className="footer-contant"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {data?.location?.link ? (
                        <img
                          onClick={() => {
                            window.open(data?.location?.link);
                          }}
                          alt={data?.location?.link}
                          src={
                            data?.location?.image?.url || PickImages.Location
                          }
                          style={{
                            width: 300,
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                      ) : null}
                      {!width ? (
                        <span style={{ marginTop: 5 }}>
                          {data?.location?.address}
                        </span>
                      ) : (
                        <p style={{ marginTop: 5 }}>
                          {data?.location?.address}
                        </p>
                      )}
                    </div>
                  </Collapse>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* <CopyRight
          layout={layoutClass}
          fluid={CopyRightFluid ? CopyRightFluid : ""}
        /> */}
        <div
          style={{
            width: "100%",
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data?.footer?.description.split("\n").map((r, index) => (
              <p style={{ margin: 0 }} key={index}>
                {r}
              </p>
            ))}
          </div>
          <div style={{ position: "absolute", top: 10, right: 24 }}>
            <img
              className="footer-images"
              alt={data?.footer?.logo?.url}
              src={
                data?.footer?.logo?.url ||
                "http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png"
              }
              style={{ maxHeight: 80 }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
export default MasterFooter;
