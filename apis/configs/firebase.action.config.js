import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../pages/firebase-config";

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

export const postFirebase = (key, params) => {
  const collectionRef = collection(firestore, key);
  return addDoc(collectionRef, { ...params })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      // useDispatch(
      //   setGlobalToaster({
      //     active: true,
      //     mess: `${error}` || "error api! post",
      //     status: "error",
      //   })
      // );
      return null;
    });
};

export const putFirebaseHasID = (key, params, id) => {
  const collectionRef = doc(firestore, key, id);
  return setDoc(collectionRef, { ...params })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      useDispatch(
        setGlobalToaster({
          active: true,
          mess: `${error}` || "error api! post",
          status: "error",
        })
      );
      return null;
    });
};
