import { useRouter } from "next/router";
import React from "react";
import { Helmet } from "react-helmet";
import HeaderOne from "../../components/headers/header-one";
import CommonLayout from "../../components/shop/common-layout";
import { Container } from "reactstrap";

export default function About() {
  const router = useRouter();
  const data = router?.query?.data ? JSON.parse(router?.query?.data) : {};

  return (
    <CommonLayout parent="Trang chủ" title={`${data?.name}`}>
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <h5>{data?.description}</h5>
          </Container>
        </div>
      </section>
    </CommonLayout>
  );
}
