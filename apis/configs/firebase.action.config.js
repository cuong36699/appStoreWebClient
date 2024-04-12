import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../pages/firebase-config";
import { toast } from "react-toastify";

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
      toast.error(`${error}`);

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

export const getFirebaseHasID = async (key, id) => {
  const collectionRef = doc(firestore, key, id);
  const docSnap = await getDoc(collectionRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
  // return getDoc(collectionRef)
  //   .then((result) => {

  //     return result;
  //   })
  //   .catch((error) => {
  //     toast.error(`${error}`);

  // useDispatch(
  //   setGlobalToaster({
  //     active: true,
  //     mess: `${error}` || "error api! get",
  //     status: "error",
  //   })
  // );
  //     return null;
  //   });
};

export const postFirebase = (key, params) => {
  const collectionRef = collection(firestore, key);
  return addDoc(collectionRef, { ...params })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      toast.error(`${error}`);

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
      toast.error(`${error}`);

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

export const putFirebase = (key, params, id) => {
  const docRef = doc(firestore, key, id);
  return updateDoc(docRef, { ...params })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      toast.error(`${error}`);

      // useDispatch(
      //   setGlobalToaster({
      //     active: true,
      //     mess: `${error}` || "error api! put",
      //     status: "error",
      //   })
      // );
      return null;
    });
};
