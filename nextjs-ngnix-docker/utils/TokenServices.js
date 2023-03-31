import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

// set access token and refresh token
export const setAccessJWT = (token) =>
  Cookies.set("accessJWT", "Bearer" + " " + token);

export const isAccessJWT = () => Boolean(Cookies.get("accessJWT"));

// get access JWT
export const getAccessJWT = () => Cookies.get("accessJWT");

// clear access and refresh token
export const clearToken = () => {
  Cookies.remove("accessJWT");
};

// get logged in user data
export const getUserData = () => {
  let userToken = getAccessJWT();
  let data;
  if (userToken) {
    data = jwt.decode(userToken);
  }
  return data;
};

// get logged in user data
export const getUserID = () => {
  let data = getUserData();
  let id = data?.adminuserId || "";
  return id;
};

// get user permission
export const getUserPermission = () => {
  let data = getUserData();
  let permission = data?.permissionInfo?.module[0]?.children || [];
  let temp1 = [];
  permission?.forEach((val) => {
    if (Object.keys(val?.action).some((k) => val?.action[k])) {
      temp1.push(val);
    }
  });
  return temp1;
};

// get user permission
export const getUserActionPermission = (url) => {
  let data = getUserPermission();
  let filteredData = data?.length && data?.filter((val) => val?.url == url);
  return filteredData;
};
