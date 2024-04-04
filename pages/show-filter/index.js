import { useRouter } from "next/router";
import React from "react";
import SpecialProducts from "../../components/common/Collections/TabCollection1";
import CommonLayout from "../../components/shop/common-layout";
import { Product4 } from "../../services/script";

export default function Category() {
  const router = useRouter();
  const { activeTab } = router?.query;
  const { category } = router?.query;
  const { detail } = router?.query;

  return (
    <CommonLayout parent="Trang chủ" title={category} subTitle={detail}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "72%" }}>
          <SpecialProducts
            type="filter"
            fluid="true"
            title="title2"
            inner="title-inner2"
            designClass="section-b-space ratio_square"
            productSlider={Product4}
            noSlider="true"
            cartClass="cart-info cart-wrap"
            noTitle="true"
            changeTab={activeTab}
          />
        </div>
      </div>
    </CommonLayout>
  );
}
