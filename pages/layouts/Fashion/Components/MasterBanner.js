import Link from "next/link";
import { useRouter } from "next/router";
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
  // 1920 x 718
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product-details`);
  };

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
                  {/* <h4>{title}</h4>
                  <h1>{desc}</h1> */}

                  <a
                    className={`btn ${btnClass ? btnClass : "btn-solid"}`}
                    onClick={handleClick}
                  >
                    {btn ? btn : "Shop Now"}{" "}
                  </a>
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
