import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Container, Row } from "reactstrap";
import { setLocal } from "../../../../helpers/Local";
import { useSelector } from "react-redux";

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
  const products = useSelector((state) => state?.common?.products);

  const handleClick = () => {
    const data = products?.find((r) => r?.id === link);
    setLocal("product", {
      id: link,
      type: data?.type?.[0]?.id,
      category: data?.category_id,
      detail: data?.category_detail_id,
    });
    router.push(`/product-details/product`);
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
                <div
                  style={{
                    // backgroundColor: "#ff4c3b30",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <h4 style={{ color: "#ff4c3b", marginBottom: 20 }}>
                    {title}
                  </h4>
                  {desc ? (
                    desc.includes("\n") ? (
                      (desc.split("\n") || []).map((r, index) => (
                        <p
                          key={index}
                          style={{
                            fontSize: 32,
                            color: "#ff4c3b",
                            fontWeight: "600",
                          }}
                        >
                          {r}
                        </p>
                      ))
                    ) : (
                      <p
                        style={{
                          fontSize: 32,
                          color: "black",
                          fontWeight: "600",
                        }}
                      >
                        {desc}
                      </p>
                    )
                  ) : null}
                  {link ? (
                    <a
                      className={`btn ${btnClass ? btnClass : "btn-solid"}`}
                      onClick={handleClick}
                    >
                      {btn ? btn : "Shop Now"}{" "}
                    </a>
                  ) : null}
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
