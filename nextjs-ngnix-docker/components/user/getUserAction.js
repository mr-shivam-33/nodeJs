import { fetchUser } from "@pages/api/userApi";
import {
  getUserFail,
  getUserPending,
  getUserSuccess,
} from "../../redux/userSlice";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());

    const result = await fetchUser();
    if (result.email) {
      return dispatch(getUserSuccess(result));
    }

    dispatch(getUserFail("User is not found"));
  } catch (error) {
    dispatch(getUserFail(error));
  }
};
