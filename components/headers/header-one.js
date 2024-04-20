import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Media, Row } from "reactstrap";
import cart from "../../public/assets/images/icon/cart.png";
import search from "../../public/assets/images/icon/search.png";
import settings from "../../public/assets/images/icon/setting.png";
import Cart from "../containers/Cart";
import CartContainer from "../containers/CartContainer";
import Currency from "./common/currency";
import LogoImage from "./common/logo";
import SideBar from "./common/sidebar";
import TopBarDark from "./common/topbar-dark";
import { useSelector } from "react-redux";

let timer = null;

const HeaderOne = ({
  logoName,
  headerClass,
  topClass,
  noTopBar,
  direction,
}) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [positionFixed, setPositionFixed] = useState(false);

  const productsAPI = useSelector((state) => state?.common?.products);
  const theme = useSelector((state) => state?.common?.theme);
  const pathname = window.location.pathname;

  const checkPage = () => {
    const check1 = pathname.includes("product-details");
    const check2 = pathname.includes("show-filter");
    if (check1 || check2) {
      return true;
    } else {
      return false;
    }
  };

  /*=====================
     Pre loader
     ==========================*/

  useEffect(() => {
    if (productsAPI) {
      const productsActive = (productsAPI || []).filter((r) => r?.status);
      setData(productsActive || []);
    }
  }, [productsAPI]);

  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display:none";
    }, 2000);

    if (router.asPath !== "/layouts/Christmas")
      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (number >= 50) {
      if (window.innerWidth < 581) {
        document.getElementById("sticky").classList.remove("fixed");
      } else {
        document.getElementById("sticky").classList.add("fixed");
        setPositionFixed(true);
      }
    } else {
      document.getElementById("sticky").classList.remove("fixed");
      setPositionFixed(false);
    }
  };

  const openNav = () => {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  };

  // eslint-disable-next-line
  const load = () => {
    setIsLoading(true);
    fetch().then(() => {
      // deal with data fetched
      setIsLoading(false);
    });
  };

  const onChangeValue = (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setValue(value);
    }, 150);
  };

  useEffect(() => {
    const searchCheck = (data || []).filter(
      (r) => r?.name && (r?.name).toLowerCase().includes(value.toLowerCase())
    );
    setDataSearch(searchCheck);
  }, [value]);

  const handleClickItem = (name, id) => {
    const nameProps = name?.split(" ").join("");
    router.push(`/product-details/${id}` + "-" + `${nameProps}`);
  };

  const valuePrice = (product) => {
    if (product?.sale) {
      const price = product?.type?.[0]?.price.replaceAll(",", "");
      const priceOff = price - (price * (product?.sale || 0)) / 100;
      const valuePrice = `${priceOff}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return valuePrice;
    } else {
      return product?.type?.[0]?.price;
    }
  };

  return (
    <div>
      <header id="sticky" className={`sticky ${headerClass}`}>
        <div className="mobile-fix-option"></div>
        {/*Top Header Component*/}
        {noTopBar ? "" : <TopBarDark topClass={topClass} />}
        {/*  */}
        <Container>
          <Row>
            <Col>
              <div
                className="main-menu"
                style={{ height: checkPage() && positionFixed ? 70 : "" }}
              >
                <div className="menu-left">
                  <div className="navbar">
                    {/* drawer */}
                    <a href={null} onClick={openNav}>
                      <div className="bar-style">
                        <i
                          className="fa fa-bars sidebar-bar"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </a>
                    {/*SideBar Navigation Component*/}
                    <SideBar />
                  </div>
                  {/* logo */}
                  <div className="brand-logo">
                    <LogoImage logo={logoName} />
                  </div>
                </div>
                <div className="menu-right pull-right">
                  {/*Top Navigation Bar Component*/}
                  {/* <NavBar /> */}
                  {/*  */}
                  <div>
                    <div className="icon-nav">
                      <ul style={{ display: "flex", alignItems: "center" }}>
                        <li className="onhover-div mobile-search">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 20,
                            }}
                          >
                            <div
                              className={`header-search-custom ${
                                theme ? "is-theme" : ""
                              }`}
                            >
                              <input
                                className={`input-search ${
                                  theme ? "is-theme" : ""
                                }`}
                                onBlur={() => {
                                  setTimeout(() => {
                                    setOpen(false);
                                  }, 150);
                                }}
                                onFocus={() => {
                                  setOpen(true);
                                }}
                                onChange={(e) => {
                                  onChangeValue(e.target.value);
                                }}
                                placeholder="Bạn cần tìm gì?"
                              />
                            </div>
                            <Media
                              src={search.src}
                              className="img-fluid"
                              alt=""
                            />
                            <i className="fa fa-search"></i>
                          </div>
                        </li>
                        {/* setting */}
                        <Currency icon={settings.src} />
                        {/*Header Cart Component */}
                        {direction === undefined ? (
                          <div style={{ minWidth: 50 }}>
                            <CartContainer layout={direction} icon={cart.src} />
                          </div>
                        ) : (
                          <Cart layout={direction} icon={cart.src} />
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {open && value ? (
          <div
            style={{
              position: "fixed",
              width: "30%",
              maxHeight: 500,
              minHeight: 80,
              backgroundColor: "#fff",
              zIndex: 50,
              right: "17%",
              boxShadow: "0px 2px 3px gray",
            }}
          >
            {value && dataSearch && dataSearch.length > 0 ? (
              dataSearch.map((item, index) => (
                <div
                  key={`${item?.id}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 80,
                    paddingInline: 16,
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickItem(item?.name, item?.id);
                  }}
                >
                  <div>
                    <img
                      src={item?.images?.[0]?.url}
                      width={50}
                      height={70}
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: 10,
                      display: "flex",
                      flexDirection: "column",
                      gap: -10,
                    }}
                  >
                    <b style={{ color: "#2b2b2b" }}>{item?.name}</b>
                    {item?.description ? (
                      <b
                        className="header-search-description"
                        style={{ fontWeight: "400", color: "gray" }}
                      >
                        {item?.description}
                      </b>
                    ) : null}
                    <div>
                      {item?.sale ? (
                        <del>
                          <b>{item?.type?.[0]?.price}</b>
                        </del>
                      ) : null}
                      <b>
                        {valuePrice(item) ? ` ${valuePrice(item)}đ` : "Liên hệ"}
                      </b>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 100,
                }}
              >
                <span>Không tìm thấy nội dung</span>
              </div>
            )}
          </div>
        ) : null}
      </header>
    </div>
  );
};

export default HeaderOne;
