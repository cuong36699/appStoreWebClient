import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  Input,
  Label,
} from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getLocal, setLocal } from "../../../helpers/Local";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { setToasterGlobal, setUser } from "../../../redux/reducers/common";
import { edit_profile } from "../../../apis/apiServices";
import Icons from "../../../public/assets/svg/icon";
import SVG from "../../SVG";
import { Box, Tab, Tabs } from "@mui/material";

let timer = null;

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter();
  const isLogin = getLocal("isLogin");
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const [seen, setSeen] = useState(false);
  const [seenOld, setSeenOld] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ pass: "", passConfirm: "" });
  const [activeTab, setActiveTab] = useState(0);

  const aboutAPI = useSelector((state) => state?.api?.aboutAPI[0]);
  const userCurrent = useSelector((state) => state?.common?.user);
  const theme = useSelector((state) => state?.common?.theme);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLocal("isLogin", false);
        router.push("/page/account/login");
        dispatch(setUser(null));
      })
      .catch((error) => {
        dispatch(
          setToasterGlobal({
            active: true,
            mess: `${error}`,
            status: "error",
          })
        );
      });
  };

  const phoneNumber = (aboutAPI?.social?.data || []).find(
    (r) => r?.name === "Phone" || r?.name === "phone"
  )?.link;

  const toggle = () => setModal(!modal);

  const handleClick = async () => {
    if (form?.pass || form?.passConfirm) {
      if (form?.pass === form?.passConfirm) {
        if (userCurrent && Object.keys(userCurrent).length > 0) {
          await edit_profile(userCurrent, userCurrent?.id);
        }
        updatePassword(user, form?.passConfirm)
          .then(() => {
            dispatch(
              setToasterGlobal({
                active: true,
                mess: `Thay đổi mật khẩu thành công`,
                status: "success",
              })
            );
            toggle();
            handleLogout();
          })
          .catch((error) => {
            dispatch(
              setToasterGlobal({
                active: true,
                mess: `${error}`,
                status: "error",
              })
            );
          });
      } else {
        dispatch(
          setToasterGlobal({
            active: true,
            mess: `Mật khẩu không trùng khớp`,
            status: "error",
          })
        );
      }
    } else {
      if (userCurrent && Object.keys(userCurrent).length > 0) {
        await edit_profile(userCurrent, userCurrent?.id);
        dispatch(setUser(userCurrent));
        toggle();
        dispatch(
          setToasterGlobal({
            active: true,
            mess: `Cập nhật hồ sơ thành công`,
            status: "success",
          })
        );
      }
    }
  };

  const handleChange = (value, type) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(setUser({ ...userCurrent, [type]: value }));
    }, 150);
  };

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
                <i className="fa fa-user" aria-hidden="true"></i>{" "}
                {isLogin
                  ? userCurrent?.last_name
                    ? `${userCurrent?.last_name}`
                    : userCurrent?.email
                    ? `${userCurrent?.email}`
                    : `Người dùng`
                  : "Tài khoản"}
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
                    <div>
                      <li onClick={() => toggle()}>
                        <a>Cập nhật hồ sơ</a>
                      </li>
                      <li onClick={() => handleLogout()}>
                        <a>Đăng xuất</a>
                      </li>
                    </div>
                  ) : null}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
        {/*  */}
        <Modal
          isOpen={modal}
          toggle={toggle}
          className="modal-lg quickview-modal"
          centered
        >
          <ModalBody>
            <div style={{ display: "flex", gap: 20 }} className="modal-custom">
              <Col lg="12">
                <Row className="content-input">
                  <div
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      width: "100%",
                      height: "auto",
                      marginBottom: 16,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: theme ? "#232323" : "background.paper",
                      }}
                      width={200}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width={"100%"}
                    >
                      <Tabs
                        value={activeTab}
                        onChange={(_, index) => {
                          setActiveTab(index);
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        textColor={theme ? "#f7f7f7" : "primary"}
                      >
                        <Tab
                          label="Hồ sơ"
                          onClick={() => {}}
                          style={{ fontSize: 16, fontWeight: 600 }}
                        />
                        <Tab
                          label="Mật khẩu"
                          onClick={() => {}}
                          style={{ fontSize: 16, fontWeight: 600 }}
                        />
                      </Tabs>
                    </Box>
                  </div>
                </Row>
                {activeTab === 0 ? (
                  <>
                    <Row className="content-input">
                      <Col>
                        <Label className="form-label" for="firstName">
                          Họ
                        </Label>
                        <Input
                          className="form-control"
                          id="first_name"
                          placeholder="Họ"
                          required=""
                          value={userCurrent?.first_name || ""}
                          onChange={(e) => {
                            handleChange(e.target.value, "first_name");
                          }}
                        />
                      </Col>
                      <Col>
                        <Label className="form-label" for="lastName">
                          Tên
                        </Label>
                        <Input
                          className="form-control"
                          id="last_name"
                          placeholder="Tên"
                          required=""
                          value={userCurrent?.last_name || ""}
                          onChange={(e) => {
                            handleChange(e.target.value, "last_name");
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="content-input">
                      <Col>
                        <Label className="form-label" for="state">
                          Quận / Huyện
                        </Label>
                        <Input
                          className="form-control"
                          id="state"
                          placeholder="Quận / Huyện"
                          required=""
                          value={userCurrent?.state || ""}
                          onChange={(e) => {
                            handleChange(e.target.value, "state");
                          }}
                        />
                      </Col>
                      <Col>
                        <Label className="form-label" for="city">
                          Thành phố
                        </Label>
                        <Input
                          className="form-control"
                          id="city"
                          placeholder="Thành phố"
                          required=""
                          value={userCurrent?.city || ""}
                          onChange={(e) => {
                            handleChange(e.target.value, "city");
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="content-input">
                      <Col>
                        <Label className="form-label" for="address">
                          Địa chỉ
                        </Label>
                        <Input
                          className="form-control"
                          id="address"
                          placeholder="Địa chỉ"
                          required=""
                          value={userCurrent?.address || ""}
                          onChange={(e) => {
                            handleChange(e.target.value, "address");
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="content-input">
                      <Col>
                        <Label className="form-label" for="email">
                          Email
                        </Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required=""
                          value={user?.email}
                          disabled
                        />
                      </Col>
                    </Row>
                    <Row className="content-input">
                      <Col>
                        <Label className="form-label" for="phone">
                          Điện thoại
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="phone"
                          placeholder="Phone"
                          required=""
                          value={userCurrent?.phone}
                          onChange={(e) => {
                            handleChange(e.target.value, "phone");
                          }}
                        />
                      </Col>
                    </Row>
                  </>
                ) : null}
                {activeTab === 1 ? (
                  <>
                    <Row className="content-input">
                      <Col md="12" style={{ position: "relative" }}>
                        <Label className="form-label" for="password">
                          Nhập lại mật khẩu cũ
                        </Label>
                        <Input
                          type={seenOld ? "text" : "password"}
                          className="form-control"
                          id="passwordOld"
                          placeholder="Nhập mật khẩu"
                          required=""
                          value={form?.passOld}
                          onChange={(e) => {
                            setForm({ ...form, passOld: e.target.value });
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: 22,
                            top: 40,
                            cursor: "pointer",
                          }}
                          onMouseDown={() => {
                            setSeenOld(true);
                          }}
                          onMouseUp={() => {
                            setSeenOld(false);
                          }}
                        >
                          <SVG src={Icons.eye} size={28} />
                        </div>
                      </Col>
                    </Row>
                    <Row className="content-input">
                      <Col md="6" style={{ position: "relative" }}>
                        <Label className="form-label" for="password">
                          Mật khẩu
                        </Label>
                        <Input
                          type={seen ? "text" : "password"}
                          className="form-control"
                          id="password"
                          placeholder="Nhập mật khẩu"
                          required=""
                          value={form?.pass}
                          onChange={(e) => {
                            setForm({ ...form, pass: e.target.value });
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: 22,
                            top: 40,
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
                      <Col md="6" style={{ position: "relative" }}>
                        <Label className="form-label" for="password">
                          Nhập lại mật khẩu
                        </Label>
                        <Input
                          type={seen ? "text" : "password"}
                          className="form-control"
                          id="passwordConfirm"
                          placeholder="Nhập mật khẩu"
                          required=""
                          value={form?.passConfirm}
                          onChange={(e) => {
                            setForm({ ...form, passConfirm: e.target.value });
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: 22,
                            top: 40,
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
                  </>
                ) : null}

                <Row>
                  <Col md="9">
                    <a
                      href="#"
                      className="btn btn-solid w-auto"
                      onClick={() => {
                        setModal(false);
                      }}
                    >
                      Đóng
                    </a>
                  </Col>
                  <Col md="3">
                    <a
                      href="#"
                      className="btn btn-solid w-auto"
                      onClick={handleClick}
                    >
                      Cập nhật
                    </a>
                  </Col>
                </Row>
              </Col>
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default TopBarDark;
