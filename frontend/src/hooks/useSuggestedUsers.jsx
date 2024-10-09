import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../slices/userSlice";

function useSuggestedUsers() {
  const dispatch = useDispatch();
  const token = useSelector((store) => store?.user?.user?.token);
  const suggestedUsers = async (user) => {
    try {
      const res = await fetch(`/api/user/suggestedUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      if (res.ok) {
        dispatch(setSuggestedUsers(data));
      }
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { suggestedUsers };
}

export default useSuggestedUsers;
