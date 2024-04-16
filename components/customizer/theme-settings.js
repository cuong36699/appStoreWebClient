import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import {
  Media,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
} from "reactstrap";
import SettingContext from "../../helpers/theme-setting/SettingContext";
import config from "./config.json";
import { getLocal, setLocal } from "../../helpers/Local";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/reducers/common";
import SVG from "../SVG";
import Icons from "../../public/assets/svg/icon";

const ThemeSettings = () => {
  const dispatch = useDispatch();

  // const [themeLayout, setThemeLayout] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const themeLayout = useSelector((state) => state?.common?.theme);
  const notification = useSelector((state) => state?.api?.notificationAPI?.[0]);

  /*=====================
     Tap on Top
     ==========================*/

  useEffect(() => {
    if (config.config.layout_version && config.config.layout_type) {
      const bodyClass = document.body.classList;
      document.body.className = `${bodyClass} ${config.config.layout_version}  ${config.config.layout_type}`;
    }

    if (localStorage.getItem("color")) {
      document.documentElement.style.setProperty(
        "--theme-deafult",
        localStorage.getItem("color")
      );
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (process.browser) {
      if (document.documentElement.scrollTop > 600) {
        document.querySelector(".tap-top").style = "display: block";
      } else {
        document.querySelector(".tap-top").style = "display: none";
      }
    }
  };

  const changeThemeLayout = () => {
    setLocal("theme", !themeLayout);
    dispatch(changeTheme(!themeLayout));
  };

  if (themeLayout) {
    if (process.browser) {
      document.body.classList.add("dark");
      config.config.layout_version = "dark";
    }
  } else {
    if (process.browser) {
      document.body.classList.remove("dark");
      config.config.layout_version = "light";
    }
  }

  // const MasterComponent = ({ ribon, bg, name, link, btnName }) => {
  //   return (
  //     <Col sm="6" className="text-center demo-effects">
  //       <div className="set-position">
  //         <div className={`layout-container ${bg}`}>
  //           {ribon ? (
  //             <div className="ribbon-1">
  //               <span>n</span>
  //               <span>e</span>
  //               <span>w</span>
  //             </div>
  //           ) : (
  //             ""
  //           )}
  //         </div>
  //         <div className="demo-text">
  //           <h4>{name}</h4>
  //           <div
  //             className="btn-group demo-btn"
  //             role="group"
  //             aria-label="Basic example"
  //           >
  //             <Link href={link}>
  //               <a className="btn new-tab-btn">{btnName} </a>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </Col>
  //   );
  // };

  return (
    <div>
      {/* ------------------------------------ change theme ------------------------------------- */}
      <div className="sidebar-btn dark-light-btn">
        <div
          className="dark-light"
          style={{ backgroundColor: themeLayout ? "black" : "white" }}
        >
          <div
            className="theme-layout-version"
            style={{ transform: "scale(0.8)" }}
            onClick={() => changeThemeLayout()}
          >
            <div
              style={{
                backgroundColor: !themeLayout ? "black" : "white",
                width: 30,
                height: 30,
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: themeLayout ? "black" : "white",
                  width: 26,
                  height: 26,
                  borderRadius: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: !themeLayout ? "black" : "white",
                    width: 16,
                    height: 16,
                    borderRadius: 100,
                  }}
                ></div>
              </div>
            </div>
            {/* {themeLayout ? "Light mode" : "Dark mode"} */}
          </div>
        </div>
      </div>
      {/* ------------------------------------- doc --------------------------------------------- */}
      <div
        className="addcart_btm_popup"
        id="fixed_cart_icon"
        style={{ backgroundColor: themeLayout ? "black" : "white" }}
      >
        <div
          style={{
            marginTop: -7,
          }}
          onClick={toggle}
        >
          <SVG src={Icons.bell} color={themeLayout ? "white" : ""} size={24} />
        </div>
      </div>

      <Modal centered={true} isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Thông báo:{" "}
          <span style={{ fontWeight: "600" }}>{`${notification?.name}`}</span>
        </ModalHeader>
        <ModalBody className="p-3">
          <p>
            <span>{notification?.content}</span>
          </p>
        </ModalBody>
        <ModalFooter>
          <p className="lh-cls">
            <b>Chú ý: </b>
            {notification?.note}
          </p>
        </ModalFooter>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ThemeSettings;
