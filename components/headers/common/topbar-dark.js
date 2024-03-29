import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getLocal, setLocal } from "../../../helpers/Local";

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter();
  const isLogin = getLocal("isLogin");

  const handleLogout = () => {
    setLocal("isLogin", false);
    router.push("/page/account/login");
  };

  const aboutAPI = useSelector((state) => state?.api?.aboutAPI[0]);
  const phoneNumber = (aboutAPI?.social?.data || []).find(
    (r) => r?.name === "Phone" || r?.name === "phone"
  )?.link;

  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Chào mừng bạn đến với store của chúng tôi</li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  <a href={phoneNumber}>
                    Điện thoại: {`${phoneNumber?.replace("tel:", "")}`}
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> Tài khoản
                <ul className="onhover-show-div">
                  {!isLogin ? (
                    <div>
                      <li>
                        <Link href={`/page/account/login`}>
                          <a>Đăng nhập</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/page/account/register`}>
                          <a>Đăng ký</a>
                        </Link>
                      </li>
                    </div>
                  ) : null}

                  {isLogin ? (
                    <li onClick={() => handleLogout()}>
                      <a>Logout</a>
                    </li>
                  ) : null}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
