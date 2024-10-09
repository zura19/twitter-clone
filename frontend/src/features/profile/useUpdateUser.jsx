import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

function useUpdateUser() {
  const dispatch = useDispatch();
  const updateUser = async function (token, updatedData) {
    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(updatedData),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        throw new Error(data.message || "Something went wrong");
      }

      if (res.ok) {
        dispatch(setUser({ ...data, token }));
        localStorage.setItem("user", JSON.stringify({ ...data, token }));
      }

      console.log(data);
    } catch (err) {
      throw err;
    }
  };
  return { updateUser };
}

export default useUpdateUser;
