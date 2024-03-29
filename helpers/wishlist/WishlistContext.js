import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const Context = createContext({
  wishlistItems: Function,
  addToWish: Function,
  removeFromWish: Function,
});

const getLocalWishlistItems = () => {
  try {
    const list = localStorage.getItem("wishlist");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

export const Provider = (props) => {
  const [wishlistItems, setWishlistItems] = useState(getLocalWishlistItems());

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add Product To Wishlist
  const addToWish = (id, type) => {
    const check = wishlistItems.some(
      (wish) => wish.id === id && wish?.type === type
    );
    if (!check) {
      toast.success("Thêm sản phẩm vào danh sách yêu thích thành công!");
      setWishlistItems([...wishlistItems, { id, type }]);
    } else {
      toast.error("Sản phẩm này đã có trong danh sách yêu thích!");
    }
  };

  // Remove Product From Wishlist
  const removeFromWish = (id, type) => {
    const newWishList = wishlistItems.filter((e) => e?.type !== type);
    setWishlistItems(newWishList);
    toast.error("Xóa sản phẩm khỏi danh sách yêu thích thành công!");
  };

  // const {value} = props

  return (
    <Context.Provider
      value={{
        wishlistItems: wishlistItems,
        addToWish: addToWish,
        removeFromWish: removeFromWish,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as WishlistContext,
  Provider as WishlistContextProvider,
} from "./WishlistContext";
