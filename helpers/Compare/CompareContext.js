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
  const addToCompare = (item, type) => {
    let data = compareItems;

    const check = data.some(
      (compare) => compare.id === item.id && compare?.typeID === type?.id
    );

    if (check) {
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Sản phẩm này đã được thêm vào`,
          status: "error",
        })
      );
      return;
    }

    if (compareItems.length > 2) {
      data = compareItems.filter((r, index) => index > 0);
    }

    const index = data.findIndex(
      (compare) => compare.id === item.id && compare?.typeID === type?.id
    );

    if (index === -1) {
      const price = type?.price?.replaceAll(",", "") || 0;
      const priceOff = price - (price * (item?.sale || 0)) / 100;
      const valuePrice = `${priceOff}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      const param = {
        id: item?.id,
        name: item?.name,
        typeName: type?.name,
        typeID: type?.id,
        image: type?.image,
        price: valuePrice,
        category: item?.category_id,
        detail: item?.category_detail_id,
        description: item?.description,
        type,
      };

      setcompareItems([...data, param]);
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Đã thêm sản phẩm thành công`,
          status: "success",
        })
      );
    }
    // else {
    //   dispatch(
    //     setToasterGlobal({
    //       active: true,
    //       mess: `Sản phẩm này đã được thêm vào`,
    //       status: "error",
    //     })
    //   );
    // }
  };

  // Remove Product From compare
  const removeFromComapre = (item) => {
    setcompareItems(compareItems.filter((e) => e.typeID !== item.typeID));
    dispatch(
      setToasterGlobal({
        active: true,
        mess: `Đã xóa sản phẩm thành công`,
        status: "success",
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
