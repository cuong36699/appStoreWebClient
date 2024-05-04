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
import { firestore } from "../../firebase-config";
import { setToasterGlobal } from "../../redux/reducers/common";

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
      useDispatch(
        setToasterGlobal({
          active: true,
          mess: `${error}` || "error api! get",
          status: "error",
        })
      );
      return null;
    });
};

export const getFirebaseHasID = async (key, id) => {
  const collectionRef = doc(firestore, key, id);
  const docSnap = await getDoc(collectionRef)
    .then((result) => {
      return result.data();
    })
    .catch(() => {
      useDispatch(
        setToasterGlobal({
          active: true,
          mess: "error api! get",
          status: "error",
        })
      );
    });
  if (docSnap) {
    return docSnap;
  }
};

export const postFirebase = (key, params) => {
  const collectionRef = collection(firestore, key);
  return addDoc(collectionRef, { ...params })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      useDispatch(
        setToasterGlobal({
          active: true,
          mess: `${error}` || "error api! get",
          status: "error",
        })
      );
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
        setToasterGlobal({
          active: true,
          mess: `${error}` || "error api! get",
          status: "error",
        })
      );
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
      useDispatch(
        setToasterGlobal({
          active: true,
          mess: `${error}` || "error api! get",
          status: "error",
        })
      );
      return null;
    });
};
