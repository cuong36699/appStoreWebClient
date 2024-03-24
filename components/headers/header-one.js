import React, { useState, useEffect } from "react";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import Cart from "../containers/Cart";
import CartContainer from "../containers/CartContainer";
import TopBarDark from "./common/topbar-dark";
import { Media, Container, Row, Col } from "reactstrap";
import LogoImage from "./common/logo";
import search from "../../public/assets/images/icon/search.png";
import settings from "../../public/assets/images/icon/setting.png";
import cart from "../../public/assets/images/icon/cart.png";
import Currency from "./common/currency";
import { useRouter } from "next/router";
import SearchOverlay from "./common/search-overlay";
import { get_products } from "../../apis/get";

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

  /*=====================
     Pre loader
     ==========================*/

  const getData = async () => {
    const productsAPI = await get_products();
    setData(productsAPI || []);
  };

  useEffect(() => {
    getData();
  }, []);

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
    if (number >= 300) {
      if (window.innerWidth < 581)
        document.getElementById("sticky").classList.remove("fixed");
      else document.getElementById("sticky").classList.add("fixed");
    } else document.getElementById("sticky").classList.remove("fixed");

    // document.getElementById("sticky").classList.add("fixed");
  };

  const openNav = () => {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  };
  // const openSearch = () => {
  //   document.getElementById("search-overlay").style.display = "block";
  // };

  const openSearch = () => {
    if (value !== "") {
      router.push({
        pathname: "/show-filter",
        query: { type: "search", value: value, category: "Tìm kiếm" },
      });
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
              <div className="main-menu">
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
                              style={{
                                backgroundColor: "#f8f8f8",
                                width: 400,
                                height: 40,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 16,
                              }}
                            >
                              <input
                                style={{
                                  border: 0,
                                  outline: 0,
                                  width: "90%",
                                  height: "100%",
                                  backgroundColor: "#f8f8f8",
                                  borderRadius: 16,
                                }}
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
                                onKeyPress={(event) => {
                                  if (event.key === "Enter") {
                                    openSearch();
                                  }
                                }}
                              />
                            </div>

                            <Media
                              src={search.src}
                              onClick={openSearch}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </li>
                        <Currency icon={settings.src} />
                        {/*Header Cart Component */}
                        {direction === undefined ? (
                          // <></>
                          <CartContainer layout={direction} icon={cart.src} />
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
        {open ? (
          <div
            style={{
              position: "fixed",
              width: "30%",
              maxHeight: 500,
              minHeight: 100,
              backgroundColor: "#fff",
              zIndex: 50,
              right: "17%",
              boxShadow: "0px 2px 3px gray",
            }}
          >
            {value && dataSearch && dataSearch.length > 0
              ? dataSearch.map((item, index) => (
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
                      />
                    </div>
                    <span style={{ marginLeft: 10 }}>{item?.name}</span>
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </header>
      {/* <SearchOverlay /> */}
    </div>
  );
};

export default HeaderOne;
