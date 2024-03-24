import { useRouter } from "next/router";
import React from "react";
import { Helmet } from "react-helmet";
import HeaderOne from "../../components/headers/header-one";

export default function About() {
  const router = useRouter();
  const data = router?.query?.data ? JSON.parse(router?.query?.data) : {};
  console.log(data, "mmmmmmmmmmmm");

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
      {/* <ModalComponent /> */}
      <HeaderOne logoName={"logo.png"} topClass="top-header" />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "71.6%" }}>
          <h3>{data?.name}</h3>
        </div>
      </div>
    </div>
  );
}
