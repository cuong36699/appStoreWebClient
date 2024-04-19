import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocal } from "../../../helpers/Local";
import { changeBrand } from "../../../redux/reducers/common";

const SideBar = () => {
  const dispatch = useDispatch();

  const closeNav = () => {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  };

  const router = useRouter();

  const category = useSelector((state) => state?.common?.category);
  const categoryDetail = useSelector((state) => state?.api?.detailAPI);

  const handleClick = (id, type, tab, category, detail) => {
    setLocal("filter", {
      id: id,
      type: type,
      tab: tab + 1,
      category,
      detail,
      activeMenu: true,
    });
    dispatch(changeBrand({ category, detail }));
    router.push({
      pathname: "/show-filter",
      query: { category, detail },
    });
  };

  const getDetail = (id) => {
    const find = (categoryDetail || []).find((data) => data?.id === id).name;
    return find;
  };

  return (
    <Fragment>
      <div id="mySidenav" className="sidenav">
        <a href={null} className="sidebar-overlay" onClick={closeNav}></a>
        <nav>
          <a href={null} onClick={closeNav}>
            <div
              className="sidebar-back text-start"
              style={{ justifyContent: "flex-end" }}
            >
              <i className="fa fa-angle-left pe-2" aria-hidden="true"></i>
            </div>
          </a>
          <ul id="sub-menu" className="sidebar-menu">
            {category && category?.length > 0
              ? (category || []).map((r, index) => {
                  return (
                    <li key={`${r?.id}-${index}`}>
                      <a
                        href="#"
                        onClick={() => {
                          closeNav();
                          handleClick(r?.id, "category", index, r?.name);
                        }}
                      >
                        {r?.name}
                        {r?.detail.length > 0 ? (
                          <span className="sub-arrow"></span>
                        ) : null}
                      </a>
                      {r?.detail &&
                      r?.detail.length > 0 &&
                      categoryDetail?.length > 0 ? (
                        <ul>
                          {(r?.detail || [])?.map((detail, indexDetail) => {
                            return (
                              <li key={`${detail?.id}-${indexDetail}`}>
                                <a
                                  href="#"
                                  onClick={() => {
                                    closeNav();
                                    handleClick(
                                      detail?.id,
                                      "category_detail",
                                      index,
                                      r?.name,
                                      getDetail(detail?.id)
                                    );
                                  }}
                                >
                                  {getDetail(detail?.id)}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </li>
                  );
                })
              : null}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
