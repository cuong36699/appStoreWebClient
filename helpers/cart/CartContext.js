import React, { useState, useEffect } from "react";
import Context from "./index";
import { removeLocal } from "../Local";
import { setToasterGlobal } from "../../redux/reducers/common";
import { useDispatch } from "react-redux";

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

const CartProvider = (props) => {
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState(getLocalCartItems());
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("Còn hàng");

  useEffect(() => {
    const Total = cartItems.reduce(
      (a, b) => a + Number((b?.total || "0")?.replaceAll(",", "")),
      0
    );
    const mixTotal = `${Total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setCartTotal(mixTotal);

    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = (product, type) => {
    if (!type?.price || type?.price == 0) {
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Hãy liên hệ cửa hàng để mua!`,
          status: "error",
        })
      );
      return;
    }

    const index = cartItems.findIndex(
      (item) => item.id === product?.id && item?.typeId === type?.id
    );
    const price = type?.price?.replaceAll(",", "");
    const priceOff = price - (price * (product?.sale || 0)) / 100;
    const valuePrice = `${priceOff}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const priceTotal = priceOff * quantity;
    const valueTotal = `${priceTotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const param = {
      id: product?.id,
      name: product?.name,
      typeName: type?.name,
      typeId: type?.id,
      image: type?.image,
      price: valuePrice,
      total: valueTotal,
      qty: quantity,
      category: product?.category_id,
      detail: product?.category_detail_id,
    };

    if (index !== -1) {
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Sản phẩm đã có trong giỏ hàng!`,
          status: "warning",
        })
      );
    } else {
      setCartItems([...cartItems, param]);
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Đã thêm sản phẩm vào giỏ hàng thành công!`,
          status: "success",
        })
      );
    }
  };

  const removeFromCart = (item) => {
    dispatch(
      setToasterGlobal({
        active: true,
        mess: `Xóa khỏi giỏ hàng thành công!`,
        status: "error",
      })
    );
    setCartItems(cartItems.filter((e) => e.typeId !== item.typeId));
  };

  const removeAllCart = () => {
    setCartItems([]);
    removeLocal("cartList");
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("Còn hàng");
    }
  };

  const plusQty = (item) => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }

    // if (item.stock >= quantity) {
    //   setQuantity(quantity + 1);
    // } else {
    //   setStock("Hết hàng!");
    // }
  };

  // Update Product Quantity
  const updateQty = (product, quantity) => {
    const index = cartItems.findIndex(
      (item) => item.id === product.id && item?.typeID === product?.typeID
    );

    if (index == -1) {
      // cartItems[index] = {
      //   ...item,
      //   qty: quantity,
      //   total: item.price * quantity,
      // };
      // setCartItems([...cartItems]);
    } else {
      const price = product?.price.replaceAll(",", "");
      const valueTotal = price * quantity;
      const mixTotal = `${valueTotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      cartItems[index] = {
        ...product,
        qty: quantity,
        total: mixTotal,
      };
      setCartItems([...cartItems]);
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
        removeAllCart: removeAllCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
