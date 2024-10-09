import { HiOutlinePencil } from "react-icons/hi";
import EditInput from "./EditInput";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUpdateUser from "./useUpdateUser";
import toast from "react-hot-toast";
import { useState } from "react";

function EditProfileForm({ editUser, editProfilePic, editCoverPic, reset }) {
  const user = useSelector((store) => store?.user?.user?.data?.user);
  const token = useSelector((store) => store?.user?.user?.token);

  const [coverImg, setCoverImg] = useState(user?.coverImg);
  const [profileImg, setProfileImg] = useState(user?.profileImg);

  const [userName, setUserName] = useState(user?.userName);
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [link, setLink] = useState(user?.link);

  const { updateUser } = useUpdateUser();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      updateUser(token, {
        profileImg,
        coverImg,
        fullName,
        userName,
        email,
        bio,
        currentPassword,
        newPassword,
        link,
      }),
    onSuccess: () => {
      toast.success("User updated Successfully!");
      queryClient.invalidateQueries();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (editCoverPic)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(token, {
            profileImg,
            coverImg,
            fullName,
            userName,
            email,
            bio,
            currentPassword,
            newPassword,
            link,
          });
        }}
      >
        <div className="mb-4 mt-4">
          <EditInput
            className={"w-full"}
            placeholder={"Cover Picture"}
            value={coverImg}
            onChange={(e) => setCoverImg(e.target.value)}
            type={"text"}
          ></EditInput>
        </div>
        <button className="btn w-full rounded-full bg-primary font-bold hover:bg-white hover:text-primary">
          Update Cover picture
        </button>
      </form>
    );

  if (editProfilePic)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(token, {
            profileImg,
            coverImg,
            fullName,
            userName,
            email,
            bio,
            currentPassword,
            newPassword,
            link,
          });
        }}
      >
        <div className="mb-4 mt-4">
          <EditInput
            className={"w-full"}
            placeholder={"Profile Picture"}
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
            type={"text"}
          ></EditInput>
        </div>
        <button className="btn w-full rounded-full bg-primary font-bold hover:bg-white hover:text-primary">
          Update Profile picture
        </button>
      </form>
    );

  if (editUser)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(token, {
            profileImg,
            coverImg,
            fullName,
            userName,
            email,
            bio,
            currentPassword,
            newPassword,
            link,
          });
        }}
      >
        <div className="mb-4 mt-4 grid w-full grid-cols-[1fr_1fr] gap-4">
          <EditInput
            placeholder={"Full Name"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type={"text"}
          ></EditInput>
          <EditInput
            placeholder={"Username"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type={"text"}
          ></EditInput>
          <EditInput
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={"text"}
          ></EditInput>
          <EditInput
            placeholder={"Bio"}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            type={"text"}
          ></EditInput>
          <EditInput
            placeholder={"Current password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type={"text"}
          ></EditInput>
          <EditInput
            placeholder={"New Password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={"text"}
          ></EditInput>
          <EditInput
            placeholder={"Link"}
            className={"col-[1/-1] w-full"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type={"text"}
          ></EditInput>
        </div>
        <button className="btn w-full rounded-full bg-primary font-bold hover:bg-white hover:text-primary">
          Update
        </button>
      </form>
    );
}

export default EditProfileForm;
