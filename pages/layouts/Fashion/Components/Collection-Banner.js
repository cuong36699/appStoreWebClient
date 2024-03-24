import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Media, Row } from "reactstrap";
import { get_voucher } from "../../../../apis/get";

const Data = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/web-store-project-e9a0f.appspot.com/o/banner%2F58b5d8aa-844d-4c13-8abc-b607a13e8941?alt=media&token=54dbd542-9183-40e4-8990-b217090930d2",
    about: "OnePlus Nord 3",
    offer: "10% off",
    link: "/left-sidebar/collection",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/web-store-project-e9a0f.appspot.com/o/banner%2F53263267-f7ab-45f4-bbc4-5e368e074c30?alt=media&token=d841b724-74d4-4770-992a-0d9062a7da6f",
    offer: "10% off",
    link: "/left-sidebar/collection",
  },
];

const MasterCollectionBanner = ({ img, about, offer, link, classes }) => {
  return (
    <Col md="6">
      <Link href={link}>
        <a>
          <div className={`collection-banner ${classes}`}>
            <img
              src={img}
              className="img-fluid"
              alt=""
              style={{ maxHeight: 310, maxWidth: 672 }}
            />
            <div className="contain-banner">
              <div>
                <h4>{offer}</h4>
                <h2>{about}</h2>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Col>
  );
};

const CollectionBanner = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const voucherAPI = await get_voucher();
    setData(voucherAPI);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      {/*collection banner*/}
      <section className="pb-0">
        <Container>
          <Row className="partition2">
            {Data.map((data, i) => {
              return (
                <MasterCollectionBanner
                  key={i}
                  img={data.img}
                  about={data.about}
                  link={data.link}
                  offer={data.offer}
                  classes={data.class}
                />
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
