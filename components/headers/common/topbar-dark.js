import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getLocal, setLocal } from "../../../helpers/Local";
import { signOut } from "firebase/auth";
import { auth } from "../../../pages/firebase-config";
import { setID } from "../../../redux/reducers/common";

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter();
  const isLogin = getLocal("isLogin");
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLocal("isLogin", false);
        router.push("/page/account/login");
        dispatch(setID(null));
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
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
                    <i className="fa fa-heart" aria-hidden="true"></i> Danh sách
                    yêu thích
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
                      <a>Đăng xuất</a>
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
