import { useRouter } from "next/router";
import React from "react";
import SpecialProducts from "../../components/common/Collections/TabCollection1";
import { Product4 } from "../../services/script";
import { Helmet } from "react-helmet";
import HeaderOne from "../../components/headers/header-one";
import HeaderFour from "../../components/headers/header-four";
import MasterFooter from "../../components/footers/common/MasterFooter";

export default function Category() {
  const router = useRouter();

  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/x-icon"
          href={"/assets/images/favicon/1.png"}
        />
      </Helmet>
      {/*  */}
      <HeaderOne logoName={"logo.png"} topClass="top-header" />
      {/*  */}
      <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#f8f8f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "72%", fontWeight: "500" }}>
          <a> {"Home >"}</a>
          {router.query?.categoryName ? (
            <a> {router.query?.categoryName}</a>
          ) : null}
          {router.query?.detailName ? (
            <a>{`> ${router.query?.detailName}`}</a>
          ) : null}
        </div>
      </div>
      {/*  */}
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
            filter={router.query}
          />
        </div>
      </div>
      {/*  */}
      <MasterFooter
        footerClass={`footer-light`}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
        logoName={"logo.png"}
      />
    </div>
  );
}
