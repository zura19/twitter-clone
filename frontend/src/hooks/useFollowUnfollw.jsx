import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
function useFollowUnfollow() {
  const token = useSelector((store) => store?.user?.user?.token);
  const user = useSelector((store) => store?.user?.user);

  const dispatch = useDispatch();

  const followUnfollow = async (id) => {
    try {
      const res = await fetch(`/api/user/follow/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data, message } = await res.json();
      if (!res.ok) {
        console.log(data);
        throw new Error("Failed to create account");
      }

      localStorage.setItem("user", JSON.stringify({ token, data }));
      dispatch(setUser({ token, data }));
      return message;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { followUnfollow };
}

export default useFollowUnfollow;
