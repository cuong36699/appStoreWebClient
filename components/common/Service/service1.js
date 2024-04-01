import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";

const ServiceLayout = ({ sectionClass }) => {
  const servicesAPI = useSelector((state) => state?.api?.servicesAPI);

  return (
    <Container>
      <section className={sectionClass}>
        <Row>
          {(servicesAPI || []).map((data, index) => {
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
