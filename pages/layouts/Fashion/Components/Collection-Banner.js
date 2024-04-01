import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import Paragraph from "../../../../components/common/Paragraph";

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

  if (Array.isArray(data) && data.length <= 0) {
    return null;
  }

  return (
    <Fragment>
      <Paragraph
        title={"Voucher"}
        className="title1 section-t-space"
        inner="title-inner1"
        hrClass={false}
      />
      {/*collection banner*/}
      <section className="pb-0 voucher-custom" style={{ padding: 0 }}>
        <Container>
          <Row className="partition2">
            {(data || []).map((item, i) => {
              if (i >= 2) {
                return;
              }
              return (
                <Col md="6" key={i}>
                  <div
                    className="voucher-background"
                    style={{
                      backgroundImage: `url(${background})`,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div className="voucher-desc">
                        <p className="p1">Gift</p>
                        <p className="p2">Voucher</p>
                      </div>
                      <div className="sale-off">
                        <span>{` ${item?.sale}% `}</span>
                        OFF
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
