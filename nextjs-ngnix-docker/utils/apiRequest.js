import { BACKEND_BASE_URL, BACKEND_BASE_URL_ADMIN } from "@pages/api";
import { handleErrorResponse } from "./common";
import { AxiosInstance } from "./http";
import { getAccessJWT } from "./TokenServices";

export const makeUrl = (url) => {
  if (!url.includes("http")) return BACKEND_BASE_URL + "/" + url;
  return url;
};

export const makeUrlAdmin = (url) => {
  if (!url.includes("http")) return BACKEND_BASE_URL_ADMIN + "/" + url;
  return url;
};

export const makeFileURL = function (URL) {
  return URL;
};

export const getAPI = (url, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await AxiosInstance.get(makeUrl(url), {
        headers: {
          Authorization: accessJWT || undefined,
        },
        params,
      });
      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const postAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();

      const res = await AxiosInstance.post(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error);
    }
  });
};

export const putAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();

      const res = await AxiosInstance.put(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const deleteAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await AxiosInstance.delete(makeUrl(url), {
        headers: {
          Authorization: accessJWT || undefined,
        },
        formData,
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

// Function for Admin

export const getAdminAPI = (url, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await AxiosInstance.get(makeUrlAdmin(url), {
        headers: {
          Authorization: accessJWT || undefined,
        },
        params,
      });
      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const postAdminAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();

      const res = await AxiosInstance.post(makeUrlAdmin(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error);
    }
  });
};

export const putAdminAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();

      const res = await AxiosInstance.put(makeUrlAdmin(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const deleteAdminAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();

      const res = await AxiosInstance.delete(makeUrlAdmin(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};
// Function for Admin
