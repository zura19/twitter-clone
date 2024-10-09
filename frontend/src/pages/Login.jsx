import { HiOutlineKey, HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import XSvg from "../components/X";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useLogin();

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => login({ userName, password }),
    onSuccess: () => {
      toast.success("User logged in successfully");
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(userName, password);
    mutate({ userName, password });
  };

  return (
    <div className="flex h-dvh items-center justify-center gap-10">
      <XSvg className={"max-w-[450px]"} />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex w-[350px] flex-col gap-2"
      >
        <h1 className="mb-2 text-3xl font-extrabold text-white">Let's go.</h1>
        <label className="input input-bordered flex items-center gap-2 rounded-md">
          <HiOutlineUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 rounded-md">
          <HiOutlineKey />
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <p
            onClick={() => setShowPassword((show) => !show)}
            className="cursor-pointer text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </p>
        </label>

        <button
          disabled={isLoading}
          className="btn btn-primary rounded-full text-white"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            "Log in"
          )}
        </button>
        {error && <p className="text-red-500">{error?.message}</p>}
        <p>Don't have an account?</p>
        <Link to={"/signup"} className="btn rounded-full bg-[rgb(24,24,24)]">
          Sign Up
        </Link>
      </form>
    </div>
  );
}

export default Login;
