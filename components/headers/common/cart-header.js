import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../helpers/cart";
import { Media } from "reactstrap";
import { setLocal } from "../../../helpers/Local";
import { useRouter } from "next/router";

const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext);
  const router = useRouter();

  const handleClick = (id, type, category, detail) => {
    setLocal("product", { id, type, category, detail });
    router.push(`/product-details/product`);
  };

  return (
    <Fragment>
      <li>
        <div className="media">
          <a
            onClick={() =>
              handleClick(item?.id, item?.typeID, item?.category, item?.detail)
            }
          >
            <Media
              alt=""
              className="me-3"
              src={`${item?.image?.url}`}
              style={{ cursor: "pointer" }}
            />
          </a>
          <div className="media-body">
            <a
              onClick={() =>
                handleClick(
                  item?.id,
                  item?.typeID,
                  item?.category,
                  item?.detail
                )
              }
              style={{ cursor: "pointer" }}
            >
              <h6>
                {item?.name} ({item?.typeName})
              </h6>
            </a>

            <h4>
              <span>
                {item?.price}
                {symbol} {"x"} {item?.qty || 1}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;
