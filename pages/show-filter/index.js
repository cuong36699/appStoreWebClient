import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import CommonLayout from "../../components/shop/common-layout";
import ProductList from "../shop/common/productList";
import { getLocal } from "../../helpers/Local";

export default function ShowFilter() {
  const router = useRouter();
  const { category, detail, id, tab, type } = router?.query;

  const brand = useSelector((state) => state?.common?.brand);

  return (
    <CommonLayout
      parent="Trang chủ"
      title={brand?.category || category}
      subTitle={brand?.detail || detail}
    >
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <ProductList
                colClass="col-xl-3 col-6 col-grid-box"
                noSidebar={true}
                pathId={id}
                tab={tab}
                selectType={type}
              />
            </Row>
          </Container>
        </div>
      </section>
    </CommonLayout>
  );
}
