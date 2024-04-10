import {
  postFirebase,
  putFirebaseHasID,
} from "../configs/firebase.action.config";

export const add_bills = (params) => {
  const key = "bills";
  return postFirebase(key, params);
};

export const add_users = (params, id) => {
  const key = "users";
  return putFirebaseHasID(key, params, id);
};
