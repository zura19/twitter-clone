import { useDispatch } from "react-redux";
import { setUser } from "./../slices/userSlice";
function useLogin() {
  const dispatch = useDispatch();
  const login = async (user) => {
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
      }
      console.log(data);
    } catch (err) {
      console.error(err);
      // toast.error(err.message);
      throw err;
    }
  };

  return { login };
}

export default useLogin;
