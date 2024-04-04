import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { setLocal } from "../../../helpers/Local";

const Filter = () => {
  const router = useRouter();
  const category = useSelector((state) => state?.common?.category);

  const backClick = () => {
    document.getElementById("filter").style.left = "-365px";
  };

  const handleClick = (id, type, tab) => {
    setLocal("filter", { id: id, type: type, tab: tab + 1 });
    router.push({
      pathname: "/show-filter",
      query: { activeTab: tab },
    });
  };

  return (
    <div className="collection-filter-block creative-card creative-inner">
      <div className="collection-mobile-back" onClick={backClick}>
        <span className="filter-back">
          <i className="fa fa-angle-left" aria-hidden="true"></i>
          back
        </span>
      </div>
      <div className="collection-collapse-block border-0 open">
        <div className="collapse-block-title">brand</div>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {category && category.length > 0 ? (
              <ul className="category-list">
                {(category || []).map((r, index) => (
                  <li key={`${r?.id}-${index}`}>
                    <a
                      href={null}
                      onClick={() => handleClick(r?.id, "category", index)}
                    >
                      {r?.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
