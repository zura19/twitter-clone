import XSvg from "../components/X";
import { HiOutlineKey, HiOutlinePencil, HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSignup from "../hooks/useSignup";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup } = useSignup();

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => signup({ fullName, email, userName, password }),
    onSuccess: () => {
      toast.success("User sign up successfully");
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = function (e) {
    e.preventDefault();
    mutate({ fullName, email, userName, password });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-10">
      <XSvg className={"max-w-[450px]"} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex w-[350px] flex-col gap-2"
      >
        <h1 className="mb-2 text-3xl font-extrabold text-white">Join today.</h1>
        <label className="input input-bordered flex items-center gap-2 rounded-md">
          <HiOutlinePencil />
          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 rounded-md">
          <HiOutlineMail />
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
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
            placeholder="Password"
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
            "Sign Up"
          )}
        </button>
        {error && <p className="text-sm text-red-600">{error?.message}</p>}
        <p>Alredy have an account?</p>
        <Link to={"/login"} className="btn rounded-full bg-[rgb(24,24,24)]">
          Log In
        </Link>
      </form>
    </div>
  );
}

export default Signup;
