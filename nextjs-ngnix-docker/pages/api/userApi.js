import { makeUrl, makeUrlAdmin } from "@utils/apiRequest";
import { AxiosInstance } from "@utils/http";
import { USER_LOGIN } from ".";
import { getAccessJWT } from "@utils/TokenServices";

export const userLogin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.post(makeUrlAdmin(USER_LOGIN), formData);
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();

      if (!accessJWT) {
        reject("Token not found!");
      }

      const res = await AxiosInstance.get(userProfileUrl, {
        headers: {
          Authorization: accessJWT,
        },
      });

      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });
};
