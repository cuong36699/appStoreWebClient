import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import CheckoutPage from "./common/checkout-page";
import Login from "../../page/account/login-auth";
import { useSelector } from "react-redux";

const Checkout = () => {
  // const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));

  const user = useSelector((state) => state?.common?.user);

  // useEffect(() => {
  //   setCurrentUser(localStorage.getItem("user"));
  // }, [localStorage.getItem("user")]);

  return (
    <>
      {user !== null ? (
        <CommonLayout parent="trang chủ" title="thanh toán">
          <CheckoutPage />
        </CommonLayout>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Checkout;
