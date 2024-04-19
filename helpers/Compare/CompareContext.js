import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToasterGlobal } from "../../redux/reducers/common";

export const Context = createContext({
  compareItems: Function,
  addToCompare: Function,
  removeFromComapre: Function,
});

const getLocalCompareItems = () => {
  try {
    const list = localStorage.getItem("compare");
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
  const dispatch = useDispatch();

  const [compareItems, setcompareItems] = useState(getLocalCompareItems());

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareItems));
  }, [compareItems]);

  // Add Product To Wishlist
  const addToCompare = (item) => {
    const index = compareItems.findIndex((compare) => compare.id === item.id);
    if (index === -1) {
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Đã thêm sản phẩm thành công`,
          status: "success",
        })
      );
      setcompareItems([...compareItems, item]);
    } else {
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Sản phẩm này đã được thêm vào`,
          status: "error",
        })
      );
    }
  };

  // Remove Product From compare
  const removeFromComapre = (item) => {
    setcompareItems(compareItems.filter((e) => e.id !== item.id));
    dispatch(
      setToasterGlobal({
        active: true,
        mess: `Đã xóa sản phẩm thành công`,
        status: "error",
      })
    );
  };

  return (
    <Context.Provider
      value={{
        compareItems: compareItems,
        addToCompare: addToCompare,
        removeFromComapre: removeFromComapre,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as CompareContext,
  Provider as CompareContextProvider,
} from "./CompareContext";
