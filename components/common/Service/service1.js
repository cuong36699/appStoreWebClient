import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";
import { useSelector } from "react-redux";

const ServiceLayout = ({ sectionClass }) => {
  const [data, setData] = useState([]);

  const servicesAPI = useSelector((state) => state?.api?.servicesAPI);

  useEffect(() => {
    if (servicesAPI) {
      setData(servicesAPI);
    }
  }, [servicesAPI]);

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
