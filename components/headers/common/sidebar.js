import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Media } from "reactstrap";
import fashion from "../../../public/assets/images/mega-menu/fashion.jpg";
import {
  get_category,
  get_category_detail,
  get_products,
} from "../../../apis/get";

const SideBar = () => {
  const closeNav = () => {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  };

  const handleSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) {
      return;
    }

    if (event.target.nextElementSibling.classList.contains("opensub1"))
      event.target.nextElementSibling.classList.remove("opensub1");
    else {
      document.querySelectorAll(".opensub1").forEach(function (value) {
        value.classList.remove("opensub1");
      });
      event.target.nextElementSibling.classList.add("opensub1");
    }
  };

  const handleSubTwoMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensub2"))
      event.target.nextElementSibling.classList.remove("opensub2");
    else {
      document.querySelectorAll(".opensub2").forEach(function (value) {
        value.classList.remove("opensub2");
      });
      event.target.nextElementSibling.classList.add("opensub2");
    }
  };
  const handleSubThreeMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensub3"))
      event.target.nextElementSibling.classList.remove("opensub3");
    else {
      document.querySelectorAll(".opensub3").forEach(function (value) {
        value.classList.remove("opensub3");
      });
      event.target.nextElementSibling.classList.add("opensub3");
    }
  };

  const handleSubFourMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensub4"))
      event.target.nextElementSibling.classList.remove("opensub4");
    else {
      document.querySelectorAll(".opensub4").forEach(function (value) {
        value.classList.remove("opensub4");
      });
      event.target.nextElementSibling.classList.add("opensub4");
    }
  };

  const handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensidesubmenu"))
      event.target.nextElementSibling.classList.remove("opensidesubmenu");
    else {
      event.target.nextElementSibling.classList.add("opensidesubmenu");
    }
  };

  const [dataCategory, setDataCategory] = useState([]);
  const [dataCategoryDetail, setDataCategoryDetail] = useState([]);

  const getData = async () => {
    const categoryAPI = await get_category();
    const categoryDetailAPI = await get_category_detail();
    setDataCategory(categoryAPI);
    setDataCategoryDetail(categoryDetailAPI);
  };

  console.log(dataCategory, "dataCategory");

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <div id="mySidenav" className="sidenav">
        <a href={null} className="sidebar-overlay" onClick={closeNav}></a>
        <nav>
          <a href={null} onClick={closeNav}>
            <div className="sidebar-back text-start">
              <i className="fa fa-angle-left pe-2" aria-hidden="true"></i> Back
            </div>
          </a>
          <ul id="sub-menu" className="sidebar-menu">
            {dataCategory && dataCategory.length > 0
              ? (dataCategory || []).map((r, index) => {
                  if (r?.status) {
                    return (
                      <li>
                        <a href="#">
                          {r?.name}
                          {r?.detail.length > 0 ? (
                            <span className="sub-arrow"></span>
                          ) : null}
                        </a>
                        {r?.detail &&
                        r?.detail.length > 0 &&
                        dataCategoryDetail.length > 0 ? (
                          <ul>
                            {(r?.detail || [])?.map((r) => {
                              const find = (dataCategoryDetail || []).find(
                                (data) => data?.id === r?.id
                              ).name;
                              return (
                                <li>
                                  <a href="#">{find}</a>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </li>
                    );
                  }
                })
              : null}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
