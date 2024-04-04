import React, { useContext, useState } from "react";
import Slider from "react-slick";
import { Media } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { useSelector } from "react-redux";
import { setLocal } from "../../../helpers/Local";
import { useRouter } from "next/router";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state?.common?.products);

  const router = useRouter();
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;

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

  const clickProductDetail = (product) => {
    const type = product?.type?.[0]?.id;
    setLocal("product", {
      id: product?.id,
      type,
      category: product?.category_id,
      detail: product?.category_detail_id,
    });
    router.push(`/product-details/product`, undefined, { shallow: true });
  };

  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">sản phẩm mới</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {!products || products.length === 0 || loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(0, 3).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="#">
                      <Media
                        onClick={() => clickProductDetail(product)}
                        className="img-fluid blur-up lazyload"
                        src={product.type?.[0]?.image?.url}
                        alt={product.type?.[0]?.image?.url}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{product.name}</h6>
                      </a>
                      <h4>
                        {valuePrice(product)}
                        {symbol}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {!products || products.length === 0 || loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(4, 7).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="#">
                      <Media
                        onClick={() => clickProductDetail(product)}
                        className="img-fluid blur-up lazyload"
                        src={product.type?.[0]?.image?.url}
                        alt={product.type?.[0]?.image?.url}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{product.name}</h6>
                      </a>
                      <h4>
                        {valuePrice(product)}
                        {symbol}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
