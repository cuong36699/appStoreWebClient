import { postFirebase } from "../configs/firebase.action.config";

export const add_bills = (params) => {
  const key = "bills";
  return postFirebase(key, params);
};
