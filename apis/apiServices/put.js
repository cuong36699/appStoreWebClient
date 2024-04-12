import {
  putFirebase,
  putFirebaseHasID,
} from "../configs/firebase.action.config";

export const edit_profile = (params, id) => {
  const key = "users";
  return putFirebase(key, params, id);
};
