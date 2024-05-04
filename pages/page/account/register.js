import React from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Input, Container, Row, Form, Label, Col } from "reactstrap";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { setLocal } from "../../../helpers/Local";
import { useDispatch } from "react-redux";
import { setID, setToasterGlobal } from "../../../redux/reducers/common";
import { useRouter } from "next/router";
import { add_users } from "../../../apis/apiServices/post";
import moment from "moment/moment";
import SVG from "../../../components/SVG";
import Icons from "../../../public/assets/svg/icon";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [seen, setSeen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const success = (user) => {
    const id = user?.uid;
    const param = {
      create_at: moment().format("DD/MM/YYYY hh:mm"),
      email: form?.email,
      id: id,
      role: "user",
      status: true,
    };
    add_users(param, id);
    dispatch(setID(id));
    setLocal("isLogin", true);
    router.push("/");
  };

  const handleClick = () => {
    if (form?.passwordConfirm && form?.password === form?.passwordConfirm) {
      createUserWithEmailAndPassword(auth, form?.email, form?.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          success(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          dispatch(
            setToasterGlobal({
              active: true,
              mess: `${errorMessage}`,
              status: "error",
            })
          );
        });
    } else {
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Mật khẩu không trùng khớp!`,
          status: "error",
        })
      );
    }
  };

  return (
    <CommonLayout parent="trang chủ" title="đăng ký">
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>tạo tài khoản</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  {/* <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        họ
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="Họ"
                        required=""
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Tên
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lname"
                        placeholder="Tên"
                        required=""
                      />
                    </Col>
                  </Row> */}
                  <Row>
                    <Row>
                      <Col md="6">
                        <Label className="form-label" for="email">
                          email
                        </Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required=""
                          value={form?.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" style={{ position: "relative" }}>
                        <Label className="form-label" for="review">
                          mật khẩu
                        </Label>
                        <Input
                          type={seen ? "text" : "password"}
                          className="form-control"
                          id="review"
                          placeholder="Nhập mật khẩu"
                          required=""
                          value={form?.password}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              password: e.target.value,
                            });
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: 25,
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
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" style={{ position: "relative" }}>
                        <Label className="form-label" for="review">
                          nhập lại mật khẩu
                        </Label>
                        <Input
                          type={seen ? "text" : "password"}
                          className="form-control"
                          id="review"
                          placeholder="Nhập mật khẩu"
                          required=""
                          value={form?.passwordConfirm}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              passwordConfirm: e.target.value,
                            });
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: 25,
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
                      </Col>
                    </Row>
                    <Col md="12">
                      <a
                        href="#"
                        className="btn btn-solid w-auto"
                        onClick={handleClick}
                      >
                        tạo tài khoản
                      </a>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Register;
