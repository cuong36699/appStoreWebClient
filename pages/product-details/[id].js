import React from "react";
import { useRouter } from "next/router";
import CommonLayout from "../../components/shop/common-layout";
import ProductSection from "./common/product_section";
// import { withApollo } from '../../helpers/apollo/apollo';
import LeftSidebarPage from "./product/leftSidebarPage";

const LeftSidebar = () => {
  const router = useRouter();
  const id = router.query.id;
  const typeId = router.query.type;

  return (
    <CommonLayout parent="Trang chủ" title="Sản phẩm">
      <LeftSidebarPage pathId={id} typeId={typeId} />
      <ProductSection pathId={id} typeId={typeId} />
    </CommonLayout>
  );
};

export default LeftSidebar;
