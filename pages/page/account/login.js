import React, { useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Input, Col } from "reactstrap";
import { setLocal } from "../../../helpers/Local";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import SVG from "../../../components/SVG";
import Icons from "../../../public/assets/svg/icon";
import { useDispatch } from "react-redux";
import { setToasterGlobal } from "../../../redux/reducers/common";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [seen, setSeen] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginForm?.email, loginForm?.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user?.uid) {
          router.push("/");
          setLocal("isLogin", true);
        }
      })
      .catch((error) => {
        dispatch(
          setToasterGlobal({
            active: true,
            mess: `Tài khoản không tồn tại!`,
            status: "error",
          })
        );
      });
  };

  const handleSignup = () => {
    router.push({
      pathname: "/page/account/register",
    });
  };

  return (
    <CommonLayout parent="trang chủ" title="đăng nhập">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>đăng nhập</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  <div className="form-group">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                      value={loginForm?.email}
                      onChange={(e) => {
                        setLoginForm({ ...loginForm, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ position: "relative" }}>
                    <Label className="form-label" for="review">
                      mật khẩu
                    </Label>
                    <Input
                      type={seen ? "text" : "password"}
                      className="form-control"
                      id="review"
                      placeholder="Enter your password"
                      required=""
                      value={loginForm?.password}
                      onChange={(e) => {
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        });
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: 18,
                        top: 35,
                        cursor: "pointer",
                      }}
                      onMouseDown={() => {
                        setSeen(true);
                      }}
                      onMouseUp={() => {
                        setSeen(false);
                      }}
                    >
                      <SVG src={Icons.eye} size={28} />
                    </div>
                  </div>
                  <a className="btn btn-solid" onClick={() => handleLogin()}>
                    Đăng nhập
                  </a>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>khách hàng mới</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">tạo một tài khoản</h6>
                <p>
                  Trở thành viên miễn phí. Đăng ký nhanh và dễ dàng. Nó cho phép
                  bạn đặt hàng từ cửa hàng chúng tôi. Để bắt đầu mua sắm hãy bấm
                  vào đăng ký tài khoản.
                </p>
                <a className="btn btn-solid" onClick={() => handleSignup()}>
                  Đăng ký tài khoản
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
