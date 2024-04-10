import React from "react";
import CommonLayout from "../../../components/shop/common-layout";
import CartPage from "./common/cart-page";

const Wishliat = () => {
  return (
    <CommonLayout parent="trang chủ" title="giỏ hàng">
      <CartPage />
    </CommonLayout>
  );
};

export default Wishliat;
