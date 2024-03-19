import React, { useState } from "react";
import { Media } from "reactstrap";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  changeByType,
}) => {
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }
  const [active, setActive] = useState(0);

  const valuePrice = () => {
    if (product?.sale) {
      return (
        (product?.type?.[active]?.price -
          (product?.type?.[active]?.price * (product?.sale || 0)) / 100) *
        product?.type?.[active]?.price
      );
    } else {
      return product?.type?.[active]?.price;
    }
  };

  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )}
        <h6>{product.name}</h6>
        {des ? <p>{product.description}</p> : ""}
        <h4>
          {valuePrice()}
          {currency?.symbol}
          {product?.sale ? (
            <del>
              <span className="money">
                {product?.type?.[active]?.price}
                {currency?.symbol}
              </span>
            </del>
          ) : null}
        </h4>
        <>
          {/* select type */}
          {title !== "Product style 4" && product?.type?.[0]?.name ? (
            <ul
              // className="color-variant"
              style={{ display: "flex", gap: 10, marginTop: 12 }}
            >
              {product?.type ? (
                <ul style={{ display: "flex", gap: 5 }}>
                  {(product?.type || [])?.map((item, i) => (
                    <li key={i}>
                      <Media
                        src={`${item?.image?.url}`}
                        alt="wishlist"
                        onClick={() => {
                          setActive(i);
                          if (item?.image?.url) {
                            changeByType(item?.image?.url);
                          }
                        }}
                        style={{
                          maxWidth: 40,
                          objectFit: "cover",
                          minHeight: 40,
                          maxHeight: 80,
                          opacity: active === i ? 1 : 0.5,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </ul>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
};

export default MasterProductDetail;
