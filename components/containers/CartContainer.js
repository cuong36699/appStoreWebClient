import React, { useContext, Fragment } from "react";
import Link from "next/link";
import CartHeader from "../headers/common/cart-header";
import CartContext from "../../helpers/cart";
import { Media } from "reactstrap";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import { getLocal } from "../../helpers/Local";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CartContainer = ({ icon }) => {
  const context = useContext(CartContext);
  const currContext = useContext(CurrencyContext);
  const symbol = currContext.state.symbol;
  const cartList = context.state;
  const total = context.cartTotal;
  const isLogin = getLocal("isLogin");
  const router = useRouter();
  const user = useSelector((state) => state?.common?.user);

  const checkOut = () => {
    if (isLogin && user?.id) {
      router.push("/page/account/checkout");
    } else {
      router.push("/page/account/login");
    }
  };

  return (
    <Fragment>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">{cartList?.length}</div>
        <Link href={`/page/account/cart`}>
          <div href={null}>
            <Media src={icon} className="img-fluid" alt="" />
            <i className="fa fa-shopping-cart"></i>
          </div>
        </Link>
        <ul className="show-div shopping-cart">
          {cartList?.map((item, index) => (
            <CartHeader key={index} item={item} total={total} symbol={symbol} />
          ))}
          {cartList?.length > 0 ? (
            <div>
              <li>
                <div className="total">
                  <h5>
                    subtotal :{" "}
                    <span>
                      {symbol}
                      {total}
                    </span>
                  </h5>
                </div>
              </li>
              <li>
                <div className="buttons view-cart">
                  <Link href={`/page/account/cart`}>
                    <a>xem giỏ hàng</a>
                  </Link>
                  <a
                    onClick={checkOut}
                    className="checkout"
                    style={{ cursor: "pointer" }}
                  >
                    thanh toán
                  </a>
                </div>
              </li>
            </div>
          ) : (
            <li>
              <h5>Không có sản phẩm trong giỏ hàng.</h5>
            </li>
          )}
        </ul>
      </li>
    </Fragment>
  );
};

export default CartContainer;
