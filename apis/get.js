import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../pages/firebase-config";

export const getFirebase = (key) => {
  const collectionRef = query(
    collection(firestore, key),
    orderBy("create_at", "desc")
  );
  return getDocs(collectionRef)
    .then((result) => {
      return result?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    })
    .catch((error) => {
      // useDispatch(
      //   setGlobalToaster({
      //     active: true,
      //     mess: `${error}` || "error api! get",
      //     status: "error",
      //   })
      // );
      return null;
    });
};

export const get_category = () => {
  const key = "category";
  return getFirebase(key);
};

export const get_category_detail = () => {
  const key = "category_detail";
  return getFirebase(key);
};

export const get_campaign = () => {
  const key = "campaign";
  return getFirebase(key);
};

export const get_banners = () => {
  const key = "banners";
  return getFirebase(key);
};

export const get_hash_tags = () => {
  const key = "hash_tags";
  return getFirebase(key);
};

export const get_staff = () => {
  const key = "staff";
  return getFirebase(key);
};

export const get_logo = () => {
  const key = "logo";
  return getFirebase(key);
};

export const get_about = () => {
  const key = "about";
  return getFirebase(key);
};

export const get_services = () => {
  const key = "services";
  return getFirebase(key);
};

export const get_voucher = () => {
  const key = "voucher";
  return getFirebase(key);
};

export const get_new_feed = () => {
  const key = "new_feed";
  return getFirebase(key);
};

export const get_product_infomation = () => {
  const key = "product_infomation";
  return getFirebase(key);
};

export const get_products = () => {
  const key = "products";
  return getFirebase(key);
};

export const get_settings = () => {
  const key = "settings";
  return getFirebase(key);
};
