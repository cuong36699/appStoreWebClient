import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import CommonLayout from "../../components/shop/common-layout";

export default function Voucher() {
  const router = useRouter();
  const id = router.query;

  const voucherAPI = useSelector((state) => state?.api?.voucherAPI);

  return (
    <CommonLayout parent="Trang chủ" title="Phiếu giảm giá"></CommonLayout>
  );
}
