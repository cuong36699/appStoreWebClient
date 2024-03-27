import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

const background = "/assets/images/voucher-coupon.jpg";

const CollectionBanner = () => {
  const [data, setData] = useState([]);

  const voucherAPI = useSelector((state) => state?.api?.voucherAPI);

  useEffect(() => {
    if (voucherAPI) {
      const voucherActive = (voucherAPI || []).filter((v) => {
        const isStart = moment().isAfter(
          moment(`${v?.start_day} ${v?.start_hour}`, "DD/MM/YYYY hh:mm")
        );
        const isEnd = moment().isAfter(
          moment(`${v?.end_day} ${v?.end_hour}`, "DD/MM/YYYY hh:mm")
        );
        return v.status && isStart && !isEnd;
      });
      setData(voucherActive);
    }
  }, [voucherAPI]);

  console.log(data, "zxccccccccccccc");

  return (
    <Fragment>
      {/*collection banner*/}
      <section className="pb-0">
        <Container>
          <Row
            className="partition2"
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {(data || []).map((data, i) => {
              return (
                <Col md="6">
                  <div
                    style={{
                      maxWidth: 672,
                      height: 310,
                      boxShadow: "0px 0.5px 5px gray",
                      padding: 12,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      fontWeight: 400,
                      backgroundImage: `url(${background})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: 200,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-end",
                          flexDirection: "column",
                        }}
                      >
                        <div>{`Cho đơn hàng sử dùng mã giảm giá này`}</div>
                        {data?.max_sale ? (
                          <div>{`Giảm tối đa đến ${data?.max_sale}Đ`}</div>
                        ) : null}
                        {data?.min_price ? (
                          <div>{`Áp dụng cho đơn hàng từ ${data?.min_price}Đ trở lên`}</div>
                        ) : null}
                      </div>
                      <div
                        style={{
                          color: "#ff4c3b",
                          fontWeight: 800,
                          fontSize: 24,
                          height: 80,
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {`Giảm`}
                        <span
                          style={{
                            color: "#ff4c3b",
                            fontWeight: 800,
                            fontSize: 54,
                          }}
                        >{` ${data?.sale}%`}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      {/*collection banner end*/}
    </Fragment>
  );
};

export default CollectionBanner;
