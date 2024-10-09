import { useDispatch } from "react-redux";
import {
  removeActiveUser,
  removeSuggestedUsers,
  removeUser,
} from "../slices/userSlice";

function useLogout() {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch(removeUser());
    dispatch(removeSuggestedUsers());
    dispatch(removeActiveUser());
  };

  return { logout };
}

export default useLogout;
