import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SideBar = () => {
  const closeNav = () => {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  };

  const router = useRouter();
  const [dataCategory, setDataCategory] = useState([]);
  const [dataCategoryDetail, setDataCategoryDetail] = useState([]);

  const categoryAPI = useSelector((state) => state?.api?.categoryAPI);
  const detailAPI = useSelector((state) => state?.api?.detailAPI);

  useEffect(() => {
    setDataCategory(categoryAPI);
    setDataCategoryDetail(detailAPI);
  }, [categoryAPI, detailAPI]);

  const handleClick = (id, type, categoryName, detailName, activeTab) => {
    router.push({
      pathname: "/show-filter",
      query: { type, id, categoryName, detailName, activeTab },
    });
  };

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
                      <li key={`${r?.id}-${index}`}>
                        <a
                          href="#"
                          onClick={() => {
                            closeNav();
                            handleClick(
                              r?.id,
                              "category",
                              r?.name,
                              null,
                              index
                            );
                          }}
                        >
                          {r?.name}
                          {r?.detail.length > 0 ? (
                            <span className="sub-arrow"></span>
                          ) : null}
                        </a>
                        {r?.detail &&
                        r?.detail.length > 0 &&
                        dataCategoryDetail.length > 0 ? (
                          <ul>
                            {(r?.detail || [])?.map((detail, indexDetail) => {
                              const find = (dataCategoryDetail || []).find(
                                (data) => data?.id === detail?.id
                              ).name;
                              return (
                                <li key={`${detail?.id}-${indexDetail}`}>
                                  <a
                                    href="#"
                                    onClick={() => {
                                      closeNav();
                                      handleClick(
                                        detail?.id,
                                        "category_detail",
                                        r?.name,
                                        find,
                                        index
                                      );
                                    }}
                                  >
                                    {find}
                                  </a>
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
