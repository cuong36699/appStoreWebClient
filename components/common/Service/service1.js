import React, { useEffect, useState } from "react";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
} from "../../../services/script";
import { Container, Row, Col } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";
import { get_services } from "../../../apis/get";

const Data = [
  {
    link: svgFreeShipping,
    name: "free shipping",
    description: "free shipping world wide",
  },
  {
    link: svgservice,
    name: "24 X 7 service",
    description: "online service for 24 x 7",
  },
  {
    link: svgoffer,
    name: "festival offer",
    description: "new online special festival offer",
  },
];

const ServiceLayout = ({ sectionClass }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const serviceAPI = await get_services();
    setData(serviceAPI);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data, "bbbvvvvvvvvvvvvvv");

  return (
    <Container>
      <section className={sectionClass}>
        <Row>
          {(data || []).map((data, index) => {
            return (
              <Col md="4" className="service-block" key={index}>
                <MasterServiceContent
                  link={data?.link}
                  title={data?.name}
                  service={data?.description}
                  url={data?.image?.url}
                />
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
};

export default ServiceLayout;
