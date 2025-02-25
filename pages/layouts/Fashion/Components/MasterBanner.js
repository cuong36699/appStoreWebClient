import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({
  img,
  title,
  desc,
  link,
  classes,
  btn,
  btnClass,
  url,
}) => {
  return (
    <div>
      <div
        className={`home ${img} ${classes ? classes : "text-center"}`}
        style={{
          backgroundImage: url ? `url(${url})` : "",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "repeat-x",
        }}
      >
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4>{title}</h4>
                  <h1>{desc}</h1>
                  <Link href={link}>
                    <a className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                      {btn ? btn : "Shop Now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
