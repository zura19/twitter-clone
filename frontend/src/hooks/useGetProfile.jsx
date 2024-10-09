import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "./../slices/userSlice";

function useGetProfile() {
  const dispatch = useDispatch();
  const token = useSelector((store) => store?.user?.user?.token);
  const getUser = async (username) => {
    try {
      const res = await fetch(`/api/user/profile/${username}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create account");
      }
      console.log(data);
      if (res.ok) {
        dispatch(setActiveUser(data?.data?.user));
        return data;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { getUser };
}

export default useGetProfile;
